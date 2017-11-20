<?php
for ($pageno = 1 ; $pageno < 1848; $pageno ++) {
    $content = file_get_contents('http://www.haha.mx/topic/1/new/'.$pageno);
    preg_match_all('/class=\"joke-main-img\" src=\"(.*?)\"/',$content,$matches);
    foreach ($matches[1] as $url) {
        $url = str_replace('small','big',$url);
        $img = file_get_contents($url);
        file_put_contents('./save/'.basename($url),$img);
    }
}
?>