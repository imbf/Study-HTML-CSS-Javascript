var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime'); // 파일의 이름을 주면 적절한 MIME 타입을 결정해 주는 모듈이다.
//이 모듈을 이용하여 HttpResponse의 "Content-Type" 항목을 적절하게 지정할 수 있다.

function sendError(response){   // 사용자가 요청한 파일이 없을 경우 오류 메시지를 전달하는 함수
    response.writeHead(404, {'Content-Type':'text/plain'});
    response.write('Error 404: File Not Found');    // 에러 메세지
    response.end();
}

function sendFile(response, filePath, fileContent){ //response객체, 파일의 경로, 파일의 내용을 parameter로 받는다.
    console.log('Sending File:' + filePath);
    response.writeHead(200, {'Content-Type' : mime.lookup(path.basename(filePath))});
    // response 헤더에 응답 유형을 지정

    response.write(fileContent);
    response.end();
}

function serverStatic(response, absPath){   // response객체와 파일의 경로를 입력으로 전달받는다.
    fs.exists(absPath, function(exists){    // 지정된 파일이 존재하는지를 fs.exists() 메서드를 이용하여 검사
        if(exists){ // 파일이 존재
            fs.readFile(absPath, function(err, data){
                if(err){
                    sendError(response);
                }else{
                    sendFile(response, absPath, data);
                }
            });
        }else{  // 파일이 존재하지 않으면
            sendError(response);
        }
    });
}

var server = http.createServer(function(request,response){
    console.log("Server serving : " + request.url);
    var filePath = null;
    if(request.url == '/'){ //request의 url을 분기하는 코드
        filePath = '/index.html'
    }else{
        filePath = request.url;
    }
    var absPath = '.' + filePath;
    serverStatic(response, absPath);    //serverStatic 함수 호출
});

server.listen(8080, function(){
    console.log('Static File SErver started at port 8080...');
})