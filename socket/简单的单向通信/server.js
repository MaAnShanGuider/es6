var net = require('net');
var server = net.createServer(function(connection){
	console.log('client connection');
	connection.on('end',function(){
		console.log('客户端关闭连接');
	});
	connection.write('Hello World!');
	connection.pipe(connection);
});
server.listen(3000,function(){
	console.log('服务器正在监听客户端');
})