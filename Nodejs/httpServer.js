var http = require("http");
var server = http.createServer();
server.on('request', function(req, res){
    res.writeHEad(200, {'Content-Type' : 'text/plain'});
    res.write("hello Wolrd");
    res.end();
})
server.listen(8080);
console.log("서버가 127.0.0.1:8080에서 시작되었습니다.");