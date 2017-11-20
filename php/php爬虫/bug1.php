<?php
/**
 * 获取花瓣网图片
 * @param  string  $mixed         查询关键字或直接一个画板id
 * @param  int        $page_limit     要查询几页的，默认只查一页
 * @return void
 */
function getHuabanImgs($mixed, $page_limit=1){
    error_reporting(0);
    set_time_limit(0);

    $board_id        = 0;
    $keyword         = '';
    $max             = '';

    if(is_numeric($mixed))
    {
        $board_id     = $mixed;
    }else
    {
        $keyword      = urlencode($mixed);
    }

    @mkdir('save');

    for ($pageno = 1 ; $pageno <= $page_limit; $pageno ++)
    {
        /*
            你喜欢用curl也行，使用这个花瓣的接口关键点是要在请求头加一个 X-Requested-With:XMLHttpRequest
            如果没有这个X-Requested-With，接口返回的是一个html网页，有的话，就是返回json
        */
        
        /*$ch     = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://huaban.com/search/?q='.$keyword.'&ixsaam0z&page='.$pageno.'&per_page=20&wfl=1');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:application','X-Request:JSON','X-Requested-With:XMLHttpRequest'));
        $response = curl_exec($ch);
        curl_close($ch);*/

        $context     = stream_context_create(array('http'=>array('method'=>'GET','header'=>"Accept:application\r\nX-Request:JSON\r\nX-Requested-With:XMLHttpRequest\r\n")));

        //按画板id查找
        if($board_id>0)
        {
            $response     = @file_get_contents('http://huaban.com/boards/'.$board_id.'/?&max='.$max.'&limit=20&wfl=1', 'r', $context);
            $arr          = @json_decode($response, true);
            $pins         = $arr['board']['pins'];
        }
        //按关键字查找
        else
        {
            $response     = @file_get_contents('http://huaban.com/search/?q='.$keyword.'&ixsaam0z&page='.$pageno.'&per_page=20&wfl=1', 'r', $context);
            $arr          = @json_decode($response, true);
            $pins         = $arr['pins'];
        }

        if(empty($pins)) break;

        foreach ((array)$pins as $key => $value)
        {
            $type         = str_replace('image/', '', $value['file']['type']);
            if(!$type || $type=='jpeg') $type = 'jpg';

            $max         = $value['pin_id'];

            /*
                花瓣的缩略图链接是这个的：http://img.hb.aicdn.com/c39ac6a698b6d95b823d0840a773bdb7f2cc057216dfd-HkHx3k_fw236
                而大图的链接是这样的：http://img.hb.aicdn.com/c39ac6a698b6d95b823d0840a773bdb7f2cc057216dfd-HkHx3k
                可以看出，其实就是去掉后面的_fw236而已，这里使用 preg_replace 正则去掉这类后缀
            */
            @copy('http://img.hb.aicdn.com/' . preg_replace('/(_[\s\S]+)?/', '', $value['file']['key']), './save/'.$value['file']['id'] . '.' . $type);
        }
    }
}

// getHuabanImgs('向日葵', 2);
getHuabanImgs('13715723', 2);

?>