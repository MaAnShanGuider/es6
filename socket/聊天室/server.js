var net = require('net'); // 使用net模块（创建TCP的SOCKET）
var PORT = 8080; //端口参数
var server = net.createServer(); //创建一个tcp的服务器
var room = [];//定义一个聊天室的数组

//on函数作用是监听函数，第一个参数为监听的数据名，第二个是监听到后执行的回调函数
server.on('connection', function (socket) {  //监听connect连接，即当客户端发起链接时，服务器捕获该链接，执行后面的函数
//客户端和服务器完成TCP链接后 会生成一个socket，这里作为回调的参数获取
  console.log("new connection" + socket.remoteAddress + ':' + socket.remotePort);
  socket.on('data', function (data) { //给socket 添加监听事件，即当客户端和服务器连接上后 进行的传输皆用该socket 进行
    var data = JSON.parse(data.toString().trim()); //JSON.parse 可将json字符串转换为json对象 【socket传输的时候只支持字符串/二进制】
   //分别获取data内的内容 
    var from = data.from;
    var to = data.to;
    var msg = data.msg;
 //定制聊天室数组内存储的json的格式，用来限制1对1聊天
    var singelRoom = {
      "name1": from,
      "name1S": socket,
      "name2": to
    }
 //如果聊天室为空 直接放入第一个单人聊天室json数据
    if (room.length == 0) {
      room.push(singelRoom);
    }
    var flag = 0;
// 遍历聊天室中的内容
    for (var i in room) {
//聊天室中存的是自己和对方的聊天信息 则执行
      if ((room[i].name1 == from && room[i].name2 == to) || (room[i].name1 == to && room[i].name2 == from)) {
        flag = 1;
    //准确的存入自己的socket
        if(room[i].name1 == from){
          room[i].name1S = socket;
        }
        if(room[i].name2 == from){
          room[i].name2S = socket;
        }
//  如果当前socket 和 单人聊天室json数据的信息一致 则获取第一方的socket
        if (room[i].name1S == socket) {
          if (room[i].name2S != null) {
            var toSocket = room[i].name2S;
            toSocket.write(msg);
          } else {
             //对方socket为空 说明对方没有发送data信息，这里没有保存他的socket信息（可以理解为对方发送消息才算上线，这里就算未上线）
            socket.write("等待对方上线");
          }
        } else {
          room[i].name2S = socket;
          if (room[i].name1S != null) {
            var toSocket = room[i].name1S;         
            toSocket.write(msg);
          } else {
            socket.write("等待对方上线");
          }
        }
      }
    }
    if (flag == 0) {
      //console.log("first");
      room.push(singelRoom);
      //console.log(room.length);
      socket.write("等待对方上线");
    }
  });

//监听客户端的close事件（即下线）
  socket.on('close', function () {
    //从聊天室中找到当前的socket 并把它置为空
    if(socket!=null){
      for (var i in room) {
        if(room[i].name1S==socket){
          room[i].name1S=null;
        }
        else if(room[i].name2S==socket){
          room[i].name2S=null;
        }
        else{
          break;
        }
      }
    }
    console.log('A client closed');
  });

//监听socket错误,并打印
  socket.on('error',(err)=>{ 
    console.log("下线请求！"+err);
  });
});

server.on('error', function (err) {
  console.log('server error:', err.message);
});

server.on('close', function () {
  console.log('server closed');
});
//服务器监听地址 0.0.0.0  端口8080
server.listen(PORT, '0.0.0.0');