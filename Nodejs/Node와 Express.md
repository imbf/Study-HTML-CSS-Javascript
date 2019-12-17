# Node와 Express

## 1.Nodejs 소개

### 1-1 Node.js란 무엇인가?

**Node.js는 크롬 브라우저의 V8 자바스크립트 엔진 위에서 작성된 자바스크립트 실행 시스템(runtime)이다. Node.js는 이벤트 중심(event-driven)의 비중단적(non-blocking) 입출력을 사용하기 때문에 매우 가벼우면서(lightweight) 효율적(effective)이다.**

즉. Node는 V8 엔진을 이용하여 자바스크립트 프로그램을 서버 측에서 실행할 수 있도록 지원하는 실행 시스템이다.

![node의 이벤트 쓰레드에 대한 이미지 검색결과](https://images.velog.io/post-images/jakeseo_me/f91dc1f0-57a8-11e9-8ae5-8fb184badb72/nodejs-architecture.png)

**이벤트 루프 (event loop)** : 각종 요청 및 입출력 작업의 완료 등이 이 실행 흐름에 이벤트로 전달되기 때문에 이벤트 루프라고 부른다.

이벤트 처리 중에 시간이 걸리는 작업이 있다면 이벤트 루프는 이 작업이 끝날 때까지 기다리지 않고 다른 작업을 하기 때문에
**"비중단적 입출력"**이라고 부른다.

Node.js는 다양한 운영체제에서 실행되기 때문에 **플랫폼 독립적(cross platform)이다.**

또한 Node.js는 대중에게 공개된 개방 소스(open source) 프로그램이다.

Node에서는 Javascript API 중 웹 브라우저와 관련된 API가 제거되었고, 파일이나 네트워크 같이 운영체제와 관련된 API가 도입되었다.

### 1-2. Node.js를 사용하는 장점

- **속도가 빠르다**. Node는 대량의 요청을 빠르게 처리할 수 있도록 최적화되어 있기 때문에 다양한 웹 개발 문제에 잘 사용할 수 있다.
- **코드가 Javascript 언어로 작성된다.** JavaScript 언어는 웹 클라이언트 프로그램을 위한 표준 언어 임으로 서버 프로그램도 JavaScript로 작성할 수 있다면 새로운 언어를 학습할 필요가 없어서 편리하다.
- 다른 웹 서버 언어인 PHP, Python등과 비교할 때 Javascript 언어는 비교적 나중에 만들어진 언어로 **최근 언어 설계 이론을** 반영하여 작성되었다.
- **Node의 패키지 관리자(package manager) 프로그램인 npm**을 이용하면 이미 개발된 수 천 개의 패키지를 사용할 수 있다. (npm 패키지는 의존성을 관리해주기 떄문에 빌드 과정이 쉬워진다.)
- Node는 이식성이 높아서 Windows, Linux, OS X, FreeBSD등 다양한 운영체제에서 잘 실행된다.
- 개발자 단체(developer community)가 잘 발달되어 있어서 필요한 경우 도움을 쉽게 받을 수 있다.

### 1-3. Node로 Hello World 프로그램 하기

```javascript
// hello.js
console.log("Hello World");
```

```
node hello.js	// hello.js 파일 실행
```

---

## 2. Node로 간단한 웹 서버 만들기

### 2-1. 응답으로 "Hello World"를 보내는 웹 서버

**모듈 수입 문장**

```javascript
var http = require("http");
```

http 모듈을 가지고 와서 프로그램안에서 사용하겠다는 의미이다.

http 모듈은 하나의 객체에다 수출하고자 하는 기능을 담아서 보내는데 이 객체를 받아서 http라는 변수에 저장하고 사용하겠다는 것이다.

**서버 생성**

```javascript
var server = http.createServer();
```

http 모듈에서 수출한 기능인 createServer() 메서드를 이용하여 http-서버(웹서버)를 만든 다음 이 서버를 server 변수에 저장하였다. 이때 서버는 만들어졌으나 <u>아직 동작하지 않는 상태이다.</u>

**응답**

```javascript
server.on('request', function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/plain'}); 
  		//응답 객체 헤더에 200코드와 보내는 자료 형태를 명시한다.
    res.write("hello Wolrd");
    res.end();
})
```

서버에 요청(request)이 들어오면 어떤 일을 해야하는지를 무명함수로 정의하였다. 이 함수는 두 개의 매개변수를 갖는데 첫 번째 매개변수는 요청 즉 HttpRequest 객체를 표시하면 두 번쨰 매개변수는 웹 서버의 응답 즉 HttpResponse 객체를 표시한다.

**서버 동작**

```javascript
server.listen(8080);	// 서버를 동작시킬 때 서버가 요청을 받아들이는 포트 번호를 저장해 서버를 동작시킨다.
```

**모듈 제작과 수입**

```javascript
// 모듈을 수입하는 예
var mod = require("module_name");

// 직접 모듈을 제작해서 다른 쪽에서 수입하게끔 할려면 수출하고자 하는 객체들을 exports 객체에 지정
exports.area = function(width){ return width * width;}
exports.parameter = function(width) { return 4 * width;}

//모듈에서 수출하려는 객체가 한개일 경우
module.exports = {
  area: function(width){ return width * width;}
  perimeter: function(width) { return 4 * width;}
};
```

**비동기적(Asynchronous) APIs**

어떤 연산을 하는데 시간이 많이 걸릴 경우 JavaScript 프로그램은 일반적으로 동기적 API보다는 **비동기적 API**를 사용한다.

```javascript
setTimeout(function(){	// 비동기적 함수
  console.log("hello");
}, 5000);
console.log("World");
```

### 2-2. HTML 파일을 보내는 웹 서버 작성

위에서 작성한 웹 서버는 모든 요청에 대해 "Hello World"라는 스트링을 응답으로 전송하였다.

지금부터 HTML 파일을 보내는 웹 서버 작성하는 방법에 대해서 설명 하겠다.

1. 응답으로 보낼 index.html 파일을 웹 서버가 있는 폴더에 작성한다.

2. 다음으로 httpServer2.js란 프로그램을 다음과 같이 입력한다.

   ```javascript
   var http = require('http');
   var fs = require('fs');	// 파일 시스템 모듈로 이미 설치된 모듈 중 하나이다
   												// 이 모듈에는 파일 열기, 닫기, 읽기, 쓰기에 대한 메서드들이 들어있다.
   												// 따라서 파일을 읽고 쓰기 위해서는 이 fs모듈을 수입해서 사용하여야 한다.
   http.createServer(function(req, res) { 
   	fs.readFile('index.html', function(err, data){	// 파일에서 자료를 읽는 메서드이다.
       res.writeHead(200, {'Content-type' : 'text/html'});
       res.end(data);	// 두 번째 매개변수에 존재하는 data를 활용해서 client에게 request를 해주었다.
     })
   });
   ```

### 2-3. 정적 파일 서버 만들기

사용자가 원하는 파일을 전송하도록 구현해보자.

```javascript
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
```

### 3-3. Express 프레임워크

Express는 가장 널리 사용되는 Node 웹 프레임워크이다.

- 다른 HTTP 동사(POST, GET, DELETE 등)와 다른 URL 경로에 대한 처리기 작성
- 템플릿에 자료를 삽입함으로써 결과를 생성하는 뷰(view) 생성 엔진이 포함되어 있음
- 접속을 위한 포트 번호라든가 응답을 생성하기 위한 템플릿 경로 등을 지정할 수 있게 한다.

**Express 코드 분석**

```javascript
// www 파일의 일부이다.
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');	// 하위 폴더의 app객체를 수입하고 있음을 알 수 있다.
var debug = require('debug')('helloworld:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
```

```javascript
// app.js 파일의 내용 중 일부이다.

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();	// app 객체는 express() 생성자를 이용해서 만들어진 객체이다.(express 응용 객체)

// view engine setup
app.set('views', path.join(__dirname, 'views'));	// 템플릿 폴더 위치를 지정한다.
// __dirname 전역변수는 프로젝트 폴더의 위치를 가지고 있고,
// path.join() 메서드는 두 개의 부분 경로를 합쳐서 하나의 경로로 만든다.
// 따라서 이 프로그램에서는 템플릿들이 프로젝트 폴더 내 Views라는 폴더에 있음을 app에게 알려주고 있다.

app.set('view engine', 'jade');	// 템플릿 엔진을 jade로 지정한다.


// app.use() 문장들은 미들웨어를 사용하겠다고 선언하는 문장들이다.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터(router)를 미들웨어로 선언한 문장들이다. 라우터 : 관련 있는 라우트(route)들을 모아놓은 것을 말한다.
app.use('/', indexRouter);
app.use('/users', usersRouter); // /users로 시작하는 모든 요청 경로에 대해 이 라우터를 사용할 것을 지정하고 있다.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');	// 오류처리 미들웨어
});

module.exports = app;

```

**라우터 사용**

**라우터** : 라우트(route) 중 서로 관련이 있는 라우트들을 모아서 처리하는 프로그램을 의미한다.

```javascript
// index.js 라우터

var express = require('express');
var router = express.Router();  //Router() 생성자를 사용하여 라우터 객체를 생성

/* GET home page. */
router.get('/', function(req, res, next) {  // get 동사를 이용한 / 경로에 대한 요청을 처리하는 라우터
  res.render('index', { title: 'Express' });  // {title: 'Express'}는 템플릿 엔진에 전달할 인수 객체이다.
});

module.exports = router;
```

**문서 템플릿 사용**

```javascript
// index.jade의 view 템플릿
extends layout	//현재 페이지가 layout 페이지를 확장하는 것이라는 것을 알려준다.

block content	// layout 페이지에서 block content라는 문장을 이 문장으로 교체하라는 의미이다.
							// "block content"는 h1 요소와 p 요소를 자식으로 갖는다.
  h1= title		// = 다음에 나오는 식을 자바스크립트 식으로 계산하여 그 결과를 넣으라는 의미이다.
  p Welcome to #{title}

```

```javascript
// layout.jade의 내용은 HTML 문서의 기본 구조를 정의하고 있다.
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')	//속성을 표시하기 위해서(괄호)를 사용한다.
  body
    block content

```

### 3-4. 사용자 정보 관리를 위한 웹 응용 개발

개발하는 과정에서 우리는 **모델(Model)-뷰(View)-컨트롤러(Controller)** 패턴을 사용하려고 한다.

**뷰(View)** : 데이터가 주어졌을 때 이 데이터를 어떻게 화면에 표시하는가를 담당하는 부분이다.

**모델(Model) :** 우리가 다루는 데이터의 형태를 정의하는 부분이다.

**컨트롤러(Controller)** : 데이터에 대한 요청을 처리하기 위해서 모델로부터 데이터를 가지고와서 뷰에서 넘겨주는 역할을 한다.

**모델 만들기**

```javascript
// Models/user.js

function User(name, phone, email){
    var now = new Date();
    this.uid = 'u' + now.getTime();
    this.name = name;
    this.phone = phone;
    this.email = email;
}

User.prototype.getUrl = function(){
    return '/users/info/' + this.uid;
}

module.exports = User;
```

**가상의 데이터 베이스 폴더 만들기**

```javascript
// database.js
// 데이터베이스로 빈 리스트를 만든 후 데이터베이스에 2명의 사용자를 추가하였다.
var User = require('./models/user');
var database = [];
database.push(new User('사용자1', '010-111-1111', 'user1@mycom'));
database.push(new User('사용자2', '010-222-2222', 'user2@myhome'));
module.exports = database;
```

**입력한 폼 내부 필드 검사**

Express Validator를 사용하면 편리하게 검사 할 수 있다.

```javascript
//app.js
//validator은 bodyparser 뒤에 둬야한다.
app.use(bodyParser, urlencoded({extended: false}));
...
app.use(expressValidator());
```

```javascript
//userControll.js 수정

exports.addUser_get = function(req, res){
  res.render('getUserInfo',{title:'사용자 추가'});
}
```

```javascript
// getUserInfo.jade파일을 생성
// input 을 이용해서 생성한다.

extends layout

block content
	h1= title
	hr
  form(action='', method='post')
		label(for='name') 이름:
		input(id='name', name='name', type='text', value=(user==undefined)?'':user.name)
		br
   	label(for='phone') 휴대폰:
		input(id='phone', name='phone', type='text', value=(user==undefined)?'':user.phone)
		br
    label(for='email') 이메일:
		input(id='email', name='email', type='text', value=(user==undefined)?'':user.email)
		br
    button(type='submit') 제출
 if errors
 		h2 Errors!
    ul
		each error in errors
			li=error.msg
```

```javascript
//controller.js

exports.addUser_post = function(req, res){
  console.log('Adding a user by post:');
  req.checkBody('name', 'Invalid Name').notEmpty;	//checkBody메서드 사용하여 필수 폼에서 필수 필드가 빠졋는지 검사
  req.sanitize('name').escape().trim() // 폼에 악성 자바스크립트가 들어가 있을 것을 대비해서 소독 한다.
}
```



















