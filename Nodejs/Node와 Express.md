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

### 



















