# client

```
meerkat
  ├─public
  │  └─img
  └─src
      ├─api
      ├─components
      │  ├─layout
      │  └─map
      ├─pages
      │  ├─Cash.js
      │  ├─Home.js
      │  ├─Layout.js
      │  ├─Login.js
      │  ├─Map.js
      │  ├─Mypage.js
      │  └─Regist.js
      └─store
          └─modules
```

<br>

# server

```
meerkat
  ├── api
  ├── config
  │    ├── jwt
  │    ├── security
  │    ├── socket
  │    └── utils
  ├── controller
  ├── dto
  │    ├── member
  │    ├── socket (기존 model 폴더에서 추후 변경 예정)
  │    └── token
  ├── entity
  ├── repository
  ├── scheduler
  ├── service
  └── socket
```

<br>

# webrtcTest

Mesh 방식으로 구현한 WebRTC를 테스트

```html
webrtcTest
  ├── front
  └── server   
```

- front : 서버와 연결 위해 일부 코드 수정 중, 커스터마이징 진행 중
- server: NodeJS 서버를 Spring Boot 서버로 변경 중

*변경 완료 후 각각 client와 server 폴더에 반영할 예정

<br>

# docs
기획 및 설계 산출물    


- 와이어프레임   
https://www.figma.com/file/ywgTAkO13oveEFtmKCT3Og/furniture-web-desjgn-(Community)

- 요구사항 명세서   
https://www.notion.so/936183033cf8421ebf567aa7d7204932

- ERD
https://www.erdcloud.com/d/6gxtiDEe2cFbRvJ6s

- API Docs   
https://docs.google.com/spreadsheets/d/1I7x4EtIxWb3OCiZ9__v7AsuZyFIJsxSLwFYI-BXjVZE/edit#gid=0