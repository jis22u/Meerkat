## 거기어때-위치 정보 공유 플랫폼

### 거기어때 링크 : [https://i8b107.p.ssafy.io]
<hr>

### 프로젝트 진행 기간

- 2023.01.03 ~ 2023.02.17 (46일)
- SSAFY 8기 2학기 공통프로젝트 - 거기어때

<hr>

### 거기어때 - 배경
- 여행? 맛집? 로드뷰의 오래된 정보 탓에 헛걸음하신 적이 있지 않으신가요?
- 검색으로도 해결되지 않는, 지금 당장의 현장 정보가 필요하시지 않으신가요?
- '거기어때'를 통해 생생한 실시간 정보를 받아보세요!

### 거기어때 - 개요
- 실시간 현장 정보와 정당한 재화의 트레이드
- 거기어때 서비스는 현장 정보를 필요로 하는 요청자와, 그 정보를 제공해주는 미어캣(제공자)와의 손을 이어주는 서비스입니다.
- 요청자가 지정한 위치의 인근 1km 이내 정보 제공자들과 재화를 Trade하는 시스템입니다.
- 누구나 미어캣(정보제공자)이 될 수 있으며, 요청자 또한 될 수 있습니다.

## 주요 기능
### 미어캣 등록
- 현재 내가 있는 위치 근처의 정보를 제공할 수 있음을 알립니다.
- 위치인증을 거친 후 미어캣으로 등록하게 되면, 맵에 마커가 생성됩니다.
- 마커의 유효시간을 설정하여 등록할 수 있으며 언제든지 수정 및 삭제가 가능합니다.

### 요청 등록 
- 실시간 정보를 얻고 싶은 좌표에서 요청 메세지와 거래할 코인의 양을 정한 후 요청 버튼만 눌러보세요!
- 그러면 배달부 미어캣이 여러분의 주문을 물고 열심히 등록 미어캣에게 뛰어가 전할 것입니다.

### Push 알람
- 미어캣은 화면을 켜놓은 채 기다릴 필요가 없습니다! 배달부 미어캣이 알림을 물고 와 알려주니까요!
- 브라우저를 내려놓더라도, 화면을 꺼놓더라도 Push 알람으로 요청 수신을 알려드립니다.
- 원터치! Push 메시지를 클릭하면, 요청자와 한번에 곧바로 연결해드립니다!
-	마음 놓고 다른 일을 하며, 알람 한번, 터치 한번으로 코인을 벌어보세요!

### 코인 충전
- 거기어때의 서비스는 사용자 간의 Win-Win을 기반으로 수립되었습니다.
- 서비스 사용을 위해서 결제를 통해 코인을 충전해 주세요! 거래에 소비된 코인은 미어캣에게 전달됩니다.
- 신용카드 결제 및 네이버페이, 카카오페이 등 모두 가능합니다!

### 마이페이지
- 현재 보유 중인 코인을 볼 수 있으며 충전, 환전 버튼을 클릭하여 해당 탭으로 이동할 수 있습니다.
- 히스토리 조회를 제공합니다! 미어캣으로서의 이력과 요청자로서의 이력을 각각 조회할 수 있습니다.

## 주요 기술

### Backend

- Spring
- IntelliJ IDE
- Springboot 2.7.8
- Maven 3.6.3
- Spring Data JPA
- Spring Security
- Spring Validation
- Spring Web
- QueryDSL
- Socket.io
- MySQL


### Frontend

- Visual Studio Code IDE
- React 17.0.2
- Redux 8.0.5
- socket.io 2.1.1
- Webstomp-Client 1.2.6
- Sock.js-Client 1.5.2
- Firebase 9.6.6
- sweetalert2 11.3.10

### CI/CD

- AWS EC2
- Docker
- Docker-compose
- Jenkins
- Nginx
- Certbot

### API

- IAMPORT(아임포트) - 결제 모듈
- Firebase Cloud Messeging - Push 알람
- Kakao Map

## 프로젝트 파일 구조

### client

```
meerkat
  ├─public
  │  |─font
  │  └─img
  └─src
      ├─api
      │  ├─auth.js
      │  ├─customAxios.js
      │  ├─firebase.js
      │  ├─map.js
      │  └─user.js
      ├─components
		 	│  ├─cash
	    │  ├─chat
	    │  ├─layout
	    │  ├─map
	    │  └─mypage
      ├─pages
      │  ├─AuthLayout.js
      │  ├─Cash.js
      │  ├─ChangeAccount.js
      │  ├─HangUp.js
      │  ├─Home.js
      │  ├─Layout.js
      │  ├─Login.js
      │  ├─Map.js
      │  ├─Mypage.js
      │  ├─Register.js
      │  ├─RegistrationDetail.js
      │  ├─VideoChat.js
	    │  └─VideoLayout.js
	    └─store
	        └─modules
		        └─authSlice.js

```

<br>

### server

```
meerkat
  ├─config
  │  ├─jwt
  │  ├─security
  │  │  ├─auth
  │  │  ├─filter
  │  │  ├─handler
  │  │  └─interceptor
  │  ├─socket
  │  └─utils
  ├─controller
  ├─dto
  │  ├─call
  │  ├─marker
  │  ├─member
  │  ├─room
  │  ├─socket
  │  └─token
  ├─entity
  ├─exception
  ├─repository
  │  └─querydsl
  ├─service
  └─socket
```

<br>

## docs
기획 및 설계 산출물    


- 와이어프레임   
https://www.figma.com/file/ywgTAkO13oveEFtmKCT3Og/furniture-web-desjgn-(Community)

- 요구사항 명세서   
https://www.notion.so/936183033cf8421ebf567aa7d7204932

- ERD
https://www.erdcloud.com/d/6gxtiDEe2cFbRvJ6s

- API Docs   
https://docs.google.com/spreadsheets/d/1I7x4EtIxWb3OCiZ9__v7AsuZyFIJsxSLwFYI-BXjVZE/edit#gid=0meerkat
