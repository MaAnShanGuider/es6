var net = require('net');
 var PORT = 8080;
 var From, To;
 var Msg = null;

//显示逻辑（4s后welcome的div 隐藏 start的div 显示）
 setTimeout(function () {
   document.getElementById("welcome").style.display = "none";
   document.getElementById("start").style.display = "block";
 }, 4000)

//创建客户端（需要制定port，即服务器监听的port 还有就是host参数，这里我没有写 默认为127.0.0.1 如果要局域网通信则写服务器的地址，其他的默认值具体可以去看官方文档）
 var client = net.connect({port: PORT}, function () {
   document.getElementById('sendBtn').onclick = function () {
    //获取from 和 to 的值
     From = document.getElementById("from").value;
     To = document.getElementById("to").value;
     if (From == To && From != "") {
       alert("请输入不一样的号码！");
       return 0;
     }
     if (From == "" || To == "") {
       alert("输入不能为空");
       return 0;
     }
     document.title = From + '正在与' + To + '通话';
     document.getElementById("start").style.display = "none";
     document.getElementById("content").style.display = "block";
   }
   document.getElementById('sendMsg').onclick = function () {
     var myDate = new Date();
     Msg = document.getElementById("msg").value;
     if(Msg==""){
       alert("输入空值给你的小伙伴看，并没有什么意义哦！");
       return 0;
     }
   //定义要发送数据的格式
     var send = {
       from: From,
       to: To,
       msg: Msg
     };
     client.on('error', function (err) {
       alert('请检查服务器是否正确启动！');
       console.log(err);
     });
   //将自己发出的数据 显示在页面中
     var textNodeTo = document.createElement('div');
     textNodeTo.innerHTML = '<p class="title">' + From + ' - 【Time ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + '】</p>' + '<p>' + Msg.toString() + '</p>';
     textNodeTo.className = 'To tr tblue';
     var parentNode = document.getElementById("chatMsg");
     parentNode.appendChild(textNodeTo);
  // socket的写操作，注意传输时转换成字符型
     client.write(JSON.stringify(send));
     document.getElementById("msg").value = null;
   };

 });

//监听data，及获取服务器发来的信息
 client.on('data', function (data) {
// 显示在页面上
   var myDate = new Date();
   var textNodeFrom = document.createElement('div');
   textNodeFrom.innerHTML = '<p class="title">' + To + ' - 【Time ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds() + '】</p>' + '<p>' + data.toString() + '</p>';
   textNodeFrom.className = 'From tl tgreen';
   var parentNode = document.getElementById("chatMsg");
   console.log(textNodeFrom);
   parentNode.appendChild(textNodeFrom);
   console.log(data.toString());
 });

 client.on('end', function () {
   console.log('Disconnected from server');
   //alert(1);
   process.exit();
 });