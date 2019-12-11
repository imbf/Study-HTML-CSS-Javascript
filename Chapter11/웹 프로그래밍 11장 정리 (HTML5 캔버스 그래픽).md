# ch11. HTML5 캔버스 그래픽

## 11-1. HTML5와 캔버스

### 웹 페이지 그래픽의 전통적인 방법

- 사진이나 그림은 \<img> 태그 이용
- 그래픽은 자바 애플릿이나 플래시 등 플러그인 이용

### 캔버스 도입

캔버스 기능은 새로 도입된 **\<canvas> 태그**로 브라우저 화면상에 할당된 공간에서 이루어진다.

캔버스의 가장 큰 장점은 모바일 단말기나 PC를 포함하여 **HTML5를 지원하는 모든 브라우저에서 작동**한다는 점이 장점이다.

HTML5 캔버스의 도입은 웹이 문서를 보여주는 수준을 넘어 응용 프로그램으로 진화하는 계기가 되었다.

### \<Canvas> 태그

**\<canvas id="캔버스 객체 id" style="CSS3 스타일 시트" width="캔버스 영역의 폭" height="캔버스 영역의 폭>** 이 태그를 지원하지 않는 브라우저가 출력할 HTML 텍스트 **\<canvas>**

하나의 웹 페이지에 여러 개의 캔버스를 만들 수 있다.

```html
<!-- 300X150픽셀 크기의 캔버스를 만드는 Code -->
<canvas id="myCanvas" width="300" height="150">
	<p>
    canvas가 지원되지 않네요 죄송합니다.
  </p>
</canvas>
```

### 캔버스(canvas) 객체와 컨텍스트 객체

**캔버스 객체 찾기**

먼저 \<canvas> 태그를 찾아 DOM 객체를 얻어낸다.

```html
var canvas = document.getElementById("myCanvas")	// 캔버스 찾기
```

**캔버스 컨텍스트 얻어내기**

캔버스 객체를 찾았으면 캔버스 객체로부터 그림을 그리는 도구(rendering tool)를 얻어낸다 -> **컨텍스트(context)**

```javascript
var context = canvas.getContext("2d");
```

**캔버스에 그리기**

```javascript
// 사각형을 그리는 코드
context.beginPath();
context.strokeStyle = "blue"	// 선 색을 파란 색으로 설정
context.rect(60,60,50,50)			// 캔버스 (60, 60)에서 50x50 크기의 사각형을 그린다.
context.stroke();							// 현재까지 구성된 도형을 캔버스에 그린다.
```

**컨텍스트 객체의 프로퍼티** (r/w)

- strokeStyle : 선 색
- fillStyle : 채우기 색
- lineWidth : 도형의 선 두께, 픽셀 단위
- font : 텍스트 폰트
- textAlign : 텍스트 정렬 방식

**컨텍스트 객체의 메소드**

- beginPath() : (경로와 관련) 이전 경로를 모두 지우고 새로 시작한다.
- closePath() : (경로와 관련) 경로의 끝 점과 시작점을 연결하는 선을 추가하고 경로를 닫는다.
- moveTo() : (경로와 관련) 경로에 새 점을 만든다.
- lineTo() : (경로와 관련) 경로의 끝 점과 연결하는 선을 추가한다.
- rect() : (경로와 관련) 경로에 사각형을 추가한다.
- arc() : (경로와 관련) 경로에 원호를 추가한다.
- fill() : (경로에 있는 도형 캔버스 그리기) 경로에 만들어진 모든 도형(사각형과 원호)를 외곽선 없이 내부만 색으로 채워 캔버스에 그린다.
- stroke() : (경로에 있는 도형 캔버스 그리기) 경로에 담겨 있는 모든 도형을 외곽선만 캔버스에 그린다.
- clearRect() : (캔버스에 바로 그리기) 캔버스에서 사각형 영역을 지운다.
- fillRect() : (캔버스에 바로 그리기) 캔버스에 외곽선 없이 사각형 영역을 색으로 바로 칠한다.
- strokeRect() : (캔버스에 바로 그리기) 사각형을 경로에 추가하지 않고 캔버스에 바로 그린다.
- strokeText() : (캔버스에 바로 그리기) 텍스트(문자열)를 캔버스에 바로 글ㄴ다.
- drawImage() : (캔버스에 바로 그리기) 이미질 캔버스에 바로 그린다.

**캔버스 그리기의 2가지 유형**

1. **beginPath()**를 호출하여 **빈 경로**를 만들고, **경로(Path)**에 먼저 선, 원, 사각형 등의 도형을 모아놓고 한번에 캔버스에 그리는 방법.
2. 경로에 담지 않고 **바로 캔버스에 그리는 방법**.

### 캔버스 그래픽 좌표

캔버스의 왼쪽 상단 모서리가 (0, 0)이고, 오른쪽으로 X축 값이 증가하며, 아래쪽으로 Y축 값이 증가한다.

### 캔버스의 그래픽 기능

- 도형 그리기와 칠하기
- 글자 그리기
- 이미지 그리기
- 이미지 변환
- 클리핑

---

## 11-2. 도형 그리기와 채우기

캔버스에 그릴 수 있는 도형의 종류는 직선, 사각형, 원호 등이며, 외곽선만 그리거나 도형 내부를 색으로 채워 그릴 수 있다.

### 도형 그리는 과정

**경로(path) : ** 캔버스 위에 '붓(펜)이 지나가는 길'

직선 사각형 원호 등의 도형을 그리는 과정

1. 경로(path) 만들기
2. 캔버스의 경로에 담긴 도형 모두 그리기

moveTo(), lineTo(), rect(), arc() 등의 메소드는 캔버스에 직접 그리지 않고 도형을 경로에 추가한다.

- beginPath() : 새로운 빈 경로를 만든다.
- stroke() : 경로에 담긴 모든 도형을 순서대로 캔버스에 그린다(외곽선만).
- fill() : 경로에 담긴 모든 도형을 순서대로 색으로 채워 캔버스에 그린다(외곽선 없이).
- clothPath() : 경로의 끝점과 경로의 시작점을 연결하는 직선을 추가하고 경로를 닫는다.

**경로 만들기**

경로를 만들기 위해서는 다음과 같이 먼저 빈 경로를 만든다.

```javascript
context.beginPath();	// 빈 경로 구성
```

그러고 나면 moveTo() 로 경로에 시작점을 설정한다.

```javascript
context.moveTo(120, 20);	// (120, 20)을 시작점으로 설정
```

시작점에서부터 경로를 구성해 간다.

```javascript
context.lineTo(20, 50);		// (120, 20)에서 (20, 50)까지의 직선을 경로에 추가
context.lineTo(150, 120);	// (20, 50)에서 (150, 120)까지의 직선을 경로에 추가
```

**캔버스에 경로전체 그리기**

stroke() 메소드는 context의 경로에 담긴 도형을 순서대로 모두 그린다.

```javascript
context.stroke();		// context의 경로 속 도형들을 캔버스에 모두 그린다.
```

**경로 지우기**

context의 경로 안에 만들어진 도형을 모두 지우려면 다음과 같이 경로를 새로 시작하면 된다.

```javascript
context.beginPath();
```

**경로 닫기**

경로 닫기는 closePath() 메소드를 이용하며, 현재 경로에 만들어진 도형의 끝점과 경로의 시작점을 연결하는 직선을 자동으로 경로에 추가한다.

```javascript
context.closePath();
```

### 선 그리기

선을 그리기 위해 필요한 컨텍스트 객체의 메소드

- moveTo(x, y) : 경로에 담긴 도형은 그대로 두고, 점 (x, y)를 새 시작점으로 삽입한다.
- lineTo(x, y) : 경로의 끝 점에서 (x, y)까지 직선을 경로에 추가한다.

```html
<!-- 선으로 삼각형 그리기 -->
<!DOCTYPE html>
<html>
    <head>
        <title>선으로 삼각형 그리기</title>
    </head>
    <body>
        <h3>선으로 삼각형 그리기</h3>
        <hr>
        <canvas id="myCanvas" style="background-color:aliceblue" width="200" height="150"></canvas>
        <script>
            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext("2d");

            context.beginPath();            // 빈 경로 만들기
            context.moveTo(120, 20);        // (120, 20)을 시작점으로 설정
            context.lineTo(20, 50);         // 경로에 (120, 20)에서 (20, 50)까지 직선 추가
            context.lineTo(150, 120);       // 경로에 (20, 50)에서 (150, 120)까지 직선 추가
            context.lineTo(120, 20);        // 경로에 (150, 120)에서 (120, 20)까지 직선 추가
            context.strokeStyle = "magenta";// 선의 색
            context.stroke();               // 경로에 폼함된 모든 도형을 캔버스에 그린다.
        </script>
    </body>
</html>
```

### 원호 그리기

컨텍스트 객체의 arc() 메소드를 이용하자.

**arc(x, y, radius, startAngle, endAngle, anticlockwise)**

- x, y, radius : (x, y)는 원호의 중심이고 radius는 반지름
- startAngle : 원호의 시작 각도. 3시를 기점으로 시계방향 각도 계산.
- endAngle : 원호의 끝 각도. 3시를 기점으로 시계방향으로 각도 계산
- anticlockwise : true이면 반시계방향, false이면 시계방향으로 원호그리기 (default : 시계 방향)

PI(파이)를 활용해서 각도를 만들어야 한다.

```javascript
// 0도에서 270도 까지 반지름 10인 원호를 그리는 코드
context(50, 50, 10, 0, 1.5*Math.PI, false)
// 
context.strok();	//캔버스에 원호를 그린다.
```



















