# [0117] Front-End 개발 시작해보기 : React

### 1. Why_How

- 왜 리액트를 쓸까?
    - 리액트의 어려운 점
        - 예전 Vue 인스턴스 : html 템플릿, script, style ⇒ 다가가기 편함, 문법 자체도 html 태그 안에서 커스터마이징 가능했기에 접근성이 편했다.
        - React : 밑에 jsx문법이 들어가지만, 기본적인 바탕자체가 script 언어를 기반으로 하고 있기에, 화면 기반의 퍼블리셔, 웹 디자인의 경우 리액트는 난해했다.
        - 그러면 지금 가장 많이 쓰이는 리액트에 대해 알아가보자
    

- 새로운 언어라는 막연함(GWB -> C -> java(oop) -> PASCAL -> Angular.js -> node.js -> vue(nuxt.js) -> react.js

ex) Vue
- 3개의 구조로 이루어짐(html/template)(script)(style)
ex) React
- 4개의 구조로 이루어짐(React 인스턴스, style, script, html(template))

### 2. CRA(Create React App)

- CRA (Create React App)
    - babel, webpack
    
- 설치 및 시작
    - Node.js 설치 ( 최신 : 19.3.0)
    - CRA 설치
        
        ```markdown
        npx create-react-app "project name"
        ```
        
    - index.js
        - 실제로 html을 다루는 곳은 “index.js”
        - App 컴포넌트 부분에 app.js가 표현이 된다.
        
    - App.js
        - 변수 지정과 return
        - 리액트에서 object를 표현하는 방법인 “중괄호 {}”를 기억해라


- babel(es6), webpack(es6) 

- Node.js 설치(보통은 LTS, 하지만 강사님은 달랐죠 Current 로 다운)
- npx create-react-app app_name 명령어 실행하기
- npm start 리액트 실행
- index.html > App.js > import 하는 routes > import 하는 component

```js
// 기본 입력 형식
const App = () => {
  return (
   <div>입력</div>
  )
}
export default App;
```

### 3. useState

- 컴포넌트 내의 데이터를 다룸 ⇒ [객체, 대체값]

```markdown
let [name, nameUpdate] = useState(["이름", "닉네임"]);
```

- vue에서도 store개념으로 hook 기능을 제공하고 있음을 인지하자

- 이벤트에 대한 값을 정확하게 전달하기 위해서 사용하는 기본 훅
ex) const [객체, 대체값] = useState(default);

### 4. component

- 리액트로 만들어진 앱을 이루는 최소한의 단위
- 컴포넌트를 쓰기 위해선 props 개념을 사용해야 한다.
    - 컴포넌트를 call하면서 props 문법을 사용해 변수값을 넘겨서 실제로 컴포넌트의 값에 적용됨을 보여줌

ex)

```js
function createHeader() {
    return (
        <div>
            <header>
                header 부분
            </header>
        </div>
    );
}

export default createHeader;
```

```js
function createBody() {
    return (
        <div>
            <header>
                <h1>본문 부분!!</h1>
            </header>
        </div>
    );
}

export default createBody;
```

```js
function createFooter() {
    return (
        <div>
            <header>
                footer 부분
            </header>
        </div>
    );
}

export default createFooter;
```

위의 3개 모두가 컴포넌트이고 이를 사용하는 방법은 다음과 같다.

```js
// App.js
import HeaderComponent from "./HeaderComponent";
import BodyComponent from "./BodyComponent";
import FooterComponent from "./FooterComponent";

const App = () => {
  return (
    <div>
      <HeaderComponent/>
      <BodyComponent/>
      <FooterComponent/>
    </div>
  );
};

export default App;
```

### 5. DataGrid(mui)

- 데이터 관리를 용이하게 할 수 있는 tool
- 컴포넌트 형태의 라이브러리를 활용

- [https://mui.com/](https://mui.com/)

⇒ 수많은 props를 통한 data 정렬 기능 제공

- npm install @mui/material @emotion/react @emotion/styled : 설치해서 MUI 사용가능

```js
import { DataGrid } from `@mui/x-data-grid';

import React from 'react';
import ReactDOM from 'react-dom';
import DataGrid from '@material-ui/core/Button'; // Button을 import 한다.

function App() {
  return (
    <DataGrid variant="contained" color="primary"> // 사용한다. 
      Hello World
    </DataGrid>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

사용법도 쉽습니다.
- 사용하고자 하는 항목을 import 한다
- mui에서 코드 복사해서 붙여넣기
- styles을 이용하여 각 component를 커스텀마이징 한다.



# [0119] 정규표현식


### 필요성

- 수 십만 라인의 텍스트를 원하는대로 쉽게 검색/치환 가능
    - 실수 없이 빠르게 코드를 작성 가능
- 정규식 1-2줄로 대부분의 문자열 작업 가능

### 특징

- 온전한 프로그래밍 언어 X 제품마다 조금씩 문법이 다름
- IDE, MS WORD, EDITOR에서 지원

### 사용 예시

- 텍스트 검색, 치환에 사용
- 이메일, 주민번호, 생년월일 등의 형식 검증
- 텍스트를 취급하는 개발 코드 작성
- 데이터 전처리 작업
- 프로젝트 리팩토링 작업
- DB 검색, 치환 작업

### 문자 집합

- 대괄호(`[]`)를 사용하여 문자 집합 표현
- 대괄호 내에 `-`은 연속 요소를 표현
- 캐럿(`^`) 문자는 집합 안에 있는 문자나 범위를 모두 제외

### 반복 찾기

- `+` 하나 이상 일치
- `*` 없거나 하나 이상 일치
- `?` 없거나 하나 일치

### 위치 찾기

- `\b` 단어 경계
- `^` 문자열 경계 시작
- `$` 문자열 경계 끝

### 하위 표현식

- 큰 표현식 안에 속한 일부 표현식을 한 항목으로 묶음
- `()`로 묶음 기능
- 역참조가 가능하다
    - 일치한 부분을 반복해 찾거나 치환에 사용
    - 하위 표현식으로 매칭된 타켓을 참조
        - (\w+)\1

### 전방/후방 탐색

- 일치 영역을 발견해도 그 값을 반환하지 않는 패틴
- `(?=일치할 텍스트)` 전방탐색
    - +(?=:)
- `(?<=일치할 텍스트)` 후방탐색
    - (?<=\/\/)+

### 참고

[정규표현식 관련 사이트](https://regexr.com/)

[손에 잡히는 10분 정규 표현식 - YES24](http://www.yes24.com/Product/Goods/75454395)



# [0120] JIRA의 활용

### JIRA가 왜 좋은가?

- 애자일 팀에서 추천하는 최고의 도구
- 프로젝트의 체계적 관리
- 편리한 이슈 트래킹
- 프로젝트 전반에 대한 레퍼런스 확보 및 관리

⇒ 포트폴리오에 “JIRA”를 어떻게 녹여내면 좋을 지 이야기해볼 것

### JIRA의 기본적 활용

- Workflow
- BULK
- Components and Labels
- Releases

### Work flow

- 템플릿 개념 : 공용템플릿을 수정하면 관련한 템플릿은 전부 변경되어, 맘대로 쓰기 쉽지 않다.
- Ticket이 생정되고 완료될 때까지의 Status 변화
- 프로젝트 진행상황을 한눈에 파악가능
- 불필요한 커뮤니케이션 감소
- Progress
    - open
    - resolve
    - QA : 품질보증
    - reopen
    - 개발자의 인지 및 assign
    - 완료 후 close
    

### BULK

- 이슈들을 SUB1에서 SUB2로 옮길 때 건바이건으로 옮기고 싶은 니즈가 있을 때, 일괄적으로 옮길 수 있는 기능(일괄변경)
- 일괄작업선택 → 이슈 편집, 이동, 전환, 삭제, 지켜보기

### Component and Labels

- 컴포넌트 : 라벨링작업 ⇒ 체계적인 관리를 위해선 컴포넌트를 써라(복수개로 넣어도 상관없다.)
    - 컴포넌트 생성 → 새 구성 요소 만들기 → 작업 세부 정보
- 라벨 : 프로젝트에 종속되지 않는 값 / 몇 백개의 라벨이 다 들어가있음 ⇒ 통계로 안잡혀서 쿼리로 짤 수 없음

### Release

- CI/CD를 구축하고 있는데, 이를 진정으로 사용하도록 돕는 JIRA의 툴
- 즉, 배포를 편하게 하기 전 버전컨트롤을 쉽게 할 수 있게 하며, 그 버전에 어떤 티켓이 있고, 안정성확보를 어떻게 하면 좋을지? 도와주는 툴이라고 생각하면 된다.
- 백로그에서 핸들링한다.
