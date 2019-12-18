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

PI(π)를 활용해서 각도를 만들어야 한다.

```javascript
// 0도에서 270도 까지 반지름 10인 원호를 그리는 코드
context(50, 50, 10, 0, 1.5*Math.PI, false)
// (50, 50)을 중심으로 반지름이 10인 원호를 경로에 추가. 원호는 0~270도(3π/2 지점)까지 시계 방향
context.strok();	//캔버스에 원호를 그린다.
```

```html
<!-- 중심이 (100, 70)이고 반지름이 각각 30, 50인 두 개의 원호를 그린 코드를 보여준다. -->
<!DOCTYPE html>
<html>
    <head>
        <title>원호 그리기</title>
    </head>
    <body>
        <h3>원호 그리기</h3>
        <hr>
        <canvas id="myCanvas" style="background-color: aliceblue;" width="200" height="150" ></canvas>
        <script>
            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext("2d");

            context.beginPath();        // 빈 경로 구성
            context.strokeStyle = "magenta";
            context.arc(100, 70, 30,0, 1.5*Math.PI, false);   // 시계 방향  //3시를 기점으로 시계방향으로 270도 계산
            context.stroke();           // 경로에 있는 원호를 그린다.

            context.beginPath();        // 이전 경로 지우고 빈 경로 구성
            context.strokeStyle = "blue";
            context.arc(100, 70, 50, 0.5*Math.PI, Math.PI, true);   // 반시계 방향 //3시를 기점으로 시계방향으로 180도 계산
            context.stroke();           // 경로에 있는 원호를 캔버스에 그린다.

        </script>
    </body>
</html>
```

### stroke()는 경로에 담긴 도형(직선, 원호, 곡선)을 직선 연결하여 그린다.

stroke()는 직선, 원호, 곡선을 그릴 때 경로 안에 만들어진 순서로 도형들을 연결하여 그린다.
하지만 사각형의 경우 이전 도형을 연결하는 직선을 그리지 않는다.

### 사각형 그리기

사각형을 그리는데 필요한 컨텍스트 객체의 메소드

- rect(x, y, w, h) : (x, y)에서 w x h 크기의 사각형을 경로에 삽입한다.

- strokeRect(x, y, w, h) : (x, y)에서 w x h 크기의 사각형을 경로에 삽입하지 않고 캔버스에 직접 그린다.

   ```javascript
   context.rect(10, 10, 100, 100);	// (10, 10)에서 100x100 크기의 사각형을 경로에 추가
   context.stroke()								// 경로에 구성된 사각형을 캔버스에 그린다.
   
   context.strokeRect(10, 10, 100, 100);		// (10, 10)에서 100x100 크기의 사각형 그리기
   ```

### beginPath()와 closePath()

경로는 beginPath() 이후 다음 beginPath()가 호출될 때까지 이어진다. stroke() 후에도 경로는 사라지지 않는다.
closePath()는 경로의 끝점에서 moveTo()로 설정된 시작점까지 직선을 경로에 추가하여 닫힌 도형이 되게 한다.

### 캔버스 지우기

캔버스에 그려진 그래픽을 모두 지우고자 할 때 사용하는 메소드

```javascript
context.clearRect(0, 0, canvas.width, canvas.height);
```

### 도형 꾸미기

strokeStyle 프로퍼티를 이용하면 선의 색을 지정할 수 있다. 채우기 색은 fillStyle 프로퍼티를 이용하면 된다.

```javascript
context.strokeStyle = "blue";

context.fillStyle = "red";
```

lineWidth 프로퍼티를 이용하면 선 굵기를 지정할 수 있다.

```javascript
context.lineWidth = 20;	// 선 굵기를 20픽셀로 지정
```

### 칠하기

도형의 내부를 색으로 칠하는 기능은 다음 3가지이다.

1. 원호 내부 칠하기
2. 사각형 내부 칠하기
3. 텍스트 내부 칠하기

**fillStyle 프로퍼티**

원호나 사각형, 텍스트의 내부를 칠할 색은 fillStyle 프로퍼티에 지정한다.

```javascript
context.fillStyle = "violet";
```

**fillRect()로 채운 사각형 그리기**

fillRect()는 경로에 넣지 않고 fillStyle에 주어진 색으로 사각형을 캔버스에 바로 채워 그린다.

```javascript
context.fillStyle = "violet";
context.fillRect(20, 20, 100, 100);		//경로에 넣지 않고 바로 그리기
```

**fill()로 경로에 만들어진 닫힌 도형 내부 칠하기**

fill()은 경로에 담긴 닫힌 도형의 내부만 칠하는 메소드이다.

```javascript
// 사각형의 내부는 violet으로, 외곽선은 gray 색으로 그리는 코드이다.
context.beginPath();
context.fillStyle = "violet";
context.rect(20, 20, 100, 100);		//경로에 사각형 삽입
context.fill(); 									//경로내 사각형 내부 칠하기
context.strokeStyle = "gray";
context.lineWidth = 10;
context.stroke();									//경로내 사각형의 외곽선 그리기
```

**fill()로 원호 내부 칠하기**

fill()은 경로 내 닫힌 영역(도형들)의 내부를 칠하는 메소드이므로 fill()을 이용하여 원호의 내부를 칠하려면 닫힌 원호를 만들어야 한다.

```javascript
context.beginPath();
context.movetTo(x,y);		//원호의 중심(x, y)을 경로의 시작점으로
context.arc(x, y, radius, 0, 1.5*Math.PI);
	//arc()의 실행 결과 경로의 시작점(x,y)에서 원호의 시작점(0도 위치)까지의 직선 자동 추가
context.closePath();	//원호의 끝점(270도)에서 경로 시작점(x,y)까지의 직선 자동 추가
context.fillStyle = "yellowgreen";
context.fill();	//경로에 있는 닫힌 원호 내부 칠하기
```

### 텍스트 그리기

캔버스에 텍스트(문자열)을 쓸 수 있따. 텍스트는 비트맵 이미지로 출력되므로 쓴다기보다는 그린다는 것이 옳다.
그러므로 캔버스에서 텍스트만 지우거나 떼어 내어 옮기는 것은 불가능하다. 텍스트는 경로에 담지 않고 캔버스에 바로 그린다.

1. 텍스트의 외곽선만 그리기 - strokeText()
2. 외곽선 없이 텍스트 내부 채워 그리기 - fillText()

**strokeText(text, x, y [, maxwidth])**
**fillText(text, x, y [, maxwidth])**

- text : 출력하고자 하는 문자열 텍스트
- x, y : 텍스트가 출력되는 시작 점 (x, y)
- maxwidth : 텍스트가 출력되는 최대 폭. text가 이 값보다 크면 자동으로 다른 폰트로 대체됨

**텍스트 외곽선 그리기**

strokeText()는 컨텍스트의 strokeStyle과 lineWidth에 지정된 값으로 텍스트의 외곽선을 그린다.

```javascript
context.strokeStyle = "blue"	//외곽선 색
context.lineWidth = "1"				//외곽선 굴기 1픽셀
context.strokeText("Javascript", 30, 100);
```

**텍스트 채워 그리기**

fillText()는 strokeStyle과 lineWidth를 무시하고 fillStyle 값만 반영하여 텍스트 내부를 채워 그린다.

```javascript
context.fillStyle = "green"		//채우기 색
context.fillText("Javascript", 30, 200);
```

**폰트**

텍스트의 폰트는 font 프로퍼티로 지정하며 디폴트는 10px의 sans-serif이다.

```javascript
context.font = "20px arial";		//20픽셀의 보통 스타일, arial 서체
context.font = "italic 20px arial"	// 20픽셀의 이탤릭 스타일, arial 서체
```

**정렬**

textAlign 프로퍼티에 "left(디폴트)", "right", "center", "start", "end"중 한 값을 지정하 텍스트의 출력 위치를 지정할 수 있다

```javascript
context.textAlign = "right"		//오른쪽 정렬
context.strokeText("Javascript", 100, 10)	// 정렬의 기준점 (100, 10)
```

---

## 11-3. 이미지 그리기

### 이미지 객체 생성

이미지 객체 생성 코드

```javascript
var img = new Image();
```

### 이미지 로딩과 onload

```javascript
img.onload = function(){	//이미지 로딩이 완료도면 함수 코드 실행
  ...						// 이곳에 img 객체에 로드된 이미지를 그리는 코드 작성
}
img.src = "test.png"		// img 객체에 test.png 파일로부터 이미지 로딩 시작
```

### 이미지 그리기

이미지 로딩이 완료되면 컨텍스트 객체의 drawImage() 메소드를 이용하여 이미지를 그린다.

**원본 크기로 그리기**

원본 이미지 크기 그대로 그리는 drawImage()는 다음과 같다.

> **drawImage(img, dx, dy)** : img 객체에 든 비트맵 이미지를 원본 크기로 캔버스 (dx, dy) 위치에 그린다.
>
> - img : 이미지 객체
> - dx, dy : 이미지가 그려질 캔버스 좌표 (dx, dy)

**크기 조절하여 그리기**

원본 이미지의 크기를 조절하여 그리는 drawImage()는 다음과 같다.

>  **drawImage(img, dx, dy, dWidth, dHeight)** : img 객체의 비트맵 이미지를 캔버스의 (dx, dy) 위치에																				  dWidth x dHeight 크기로 변형하여 그린다.
>
> - dWidth, dHeight : 이미지가 그려지는 크기, dWidth x dHeight

**원본의 일부분을 크기 조절하여 그리기**

원본 이미지의 일부분을 택하고 크기를 조절하여 그리는 drawImage()는 다음과 같다.

> drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) : img 이미지 내부의 (sx, sy) 위치에서
> 					sWidth x sHeight 영역의 비트맵을, 캔버스 (dx, dy) 위치에 dWidth x dHeight 크기로 변형하여 그린다.
>
> - sx, sy : img 이미지 내 비트맵 좌표 (sx, sy)
> - sWidth, sHeight : 그리기 위해 선택한 img 내의 비트맵 크기

### 이미지 그리기 사례

**(20, 20) 위치에 원본 크기로 그리기**

```javascript
var img = new Image();
img.onload = function(){		// 이미지 로딩이 완료되면 실행되는 함수
  context.drawImage(img, 20, 20);	// img의 비트맵 이미지를 (20, 20)에 원본 크기로 그린다.
}
img.src = "text.png";	// 이미지 로딩을 시작시킨다.
```

**(20, 20) 위치에 100 x 200 크기로 그리기**

```javascript
var img = new Image();
img.onload = function(){	//이미지 로딩이 완료되면 실행되는 함수
  context.drawImage(img, 20, 20, 100, 200)	// img를 (20,20)에 100x200 크기로 그린다.
}
img.src = "text.png";	//이미지 로딩을 시작시킨다.
```

**캔버스에 꽉 차게 이미지 그리기**

캔버스의 크기는 canvas.width와 canvas.height로 알아낼 수 있다.

```javascript
var img = new Image();
img.onload = function(){	// 이미지 로딩이 완료되면 실행되는 함수vco
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
}
img.src = "text.png";	// 이미지 로딩을 시작시킨다.
```

---

## 11-4. canvas 객체와 마우스 이벤트 활용

canvas 객체 역시 DOM 객체이므로 이벤트를 처리할 수 있다. 이 절에서는 마우스 이벤트를 이용하여, 다음과 같은 사용자가
마우스로 드래깅하여 캔버스 위에 자유롭게 그림을 그리는 자바스크립트 응용 프로그램을 작성해 보자.

### 캔버스 태그와 초기화

**캔버스 태그**

캔버스의 크기는 500 x 400, 배경색은 aliceblue로 \<canvas> 태그를 작성한다.

```html
<canvas id="myCanvas" style="background-color:aliceblue" width="500" height="400"></canvas>
```

**캔버스 객체와 컨텍스트 알아내고 초기화**

캔버스 객체와 컨텍스트 객체를 알아내고 선의 굵기를 2픽셀, 색을 blue로 지정한다.

```javascript
var canvas, context;
canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");
context.lineWidth = 2;				//선 굵기를 2픽셀로 지정
context.strokeStyle = "blue"	//선 색을 파란색으로 지정
```

**마우스 리스너 등록**

마우스가 눌러질 때(mousedown), 눌러진 마우스가 놓여 질 때(mouseup), 마우스를 움직이는 동안 (mousemove), 
마우스가 캔버스 영역을 벗어나는 경우 (mouseout)를 처리하는 이벤트 리스너 코드를 작성하고 등록한다.

```javascript
canvas.addEventListener("mousedown", function(e){ down(e) }, false);
canvas.addEventListener("mouseup", function(e){ up(e) }, false);
canvas.addEventListener("mousemove", function(e){ move(e) }, false);
canvas.addEventListener("mouseout", function(e){ out(e) }, false);
// 이벤트가 발생하면 마우스 이벤트 객체가 function(e)의 매개변수 e에 전달된다.
```

### 마우스 이벤트 처리

**마우스가 눌러질 때, function down(e) 실행**

마우스가 눌러지면 down(e) 함수가 실행되며, 이벤트 객체 e의 **e.offsetX**와 **e.offsetY**를 통해 캔버스 내 마우스가 눌러진 위치를 알 수 있다. 마우스가 눌려진 위치에서 드래깅하는 동안 그림을 그리기 때문에 마우스가 눌러진 위치를 전역변수 startX와 startY에 저장한다.

```javascript
startX = e.offsetX;	// 마우스가 눌러진 x 위치 저장
startY = e.offsetY;	// 마우스가 눌러진 y 위치 저장
```

드래깅을 통해 그림이 그려질 상태를 뜻하는 dragging 변수를 true로 설정한다.

```javascript
dragging = true;
```

**마우스가 놓여 질 때, function up(e) 실행**

마우스가 놓여지면 드래깅이 끝났으므로 dragging 변수를 false로 설정한다.

```javascript
dragging = false;
```

**마우스가 움직일 때, function move(e) 실행**

마우스가 움직이는 동안 mousemove 이벤트가 계속 발생하여 move(e) 함수가 계속 호출한다.
move(e) 함수는 다음 코드를 이용하여 마우스가 눌러져 있지 않으면 그냥 리턴한다.

```javascript
if(!dragging) return;
```

dragging이 true라면 curX와 curY에 현재 마우스의 위치 값 e.offsetX와 e.offsetY를 저장한다.

```javascript
curX = e.offsetX; curY = e.offsetY;
```

그리고 나서 (startX, startY)에서 (curX, curY) 사이의 선을 그리도록 draw(curX, curY)를 호출한다.

```javascript
draw(curX, curY);
```

(curX, curY)는 드래깅하는 동안 계속 변하는 마우스 커서의 현재 위치이다. startX와 startY를 현재 마우스의 위치로 변경하고 함수를 빠져나온다.

```javascript
startX = curX; startY = curY;
```

**마우스가 캔버스를 벗어날 때, function out(e) 실행**

마우스가 캔버스를 벗어나면 그림 그리기를 중단시킨다. 이를 위해 out(e)  함수에서는 다음과 같이 dragging 변수 값을 false로 설정한다.

```javascript
dragging = false;
```

다시 캔버스 상에 마우스가 눌러져야 그리기를 시작할 수 있다.

### 그림 그리기, draw(curX, curY)

```javascript
context.beginPath();						// 새로운 경로 시작
context.moveTo(startX, startY);	// 경로에 시작점 추가
context.lineTo(curX, curY);			// 경로에 (startX, startY)에서 (curX, curY) 사이의 선 추가
context.stroke();								//경로 모두 그리기
```























