# 거기어때 - 실시간 정보 공유 플랫폼
SSAFY 8기 2학기 공통 프로젝트   
2023.01.03 ~ 2023.02.17 (46일)   

<br>

## 👩‍👧‍👦 프로젝트 기획 배경

- 여행? 맛집? 로드뷰의 오래된 정보 탓에 헛걸음하신 적이 있지 않으신가요?
- 검색으로도 해결되지 않는, 지금 당장의 현장 정보가 필요하시지 않으신가요?
- '거기어때'를 통해 생생한 실시간 정보를 받아보세요!

<br>

## 📌 주요기능

- 일대일 화상채팅 기능을 통해 실시간 장소 정보를 제공하거나 받을 수 있습니다.
- 지도 위의 마커를 움직여 정보를 제공할 장소에 제공자 마커를 등록합니다. (제공자)
- 실시간 현장 정보를 필요로 하는 요청자는 해당 위치에 요청폼을 등록합니다. (요청자)
- 요청 위치의 인근 1km 이내 제공자에게 Push 알림으로 요청이 전달됩니다.
- 사용자가 결제한 코인으로 실시간 정보 제공에 대한 거래가 이루어집니다.

  ```
  저희 서비스는 특별히 정보 제공자에게 미어캣🐹이라는 별명을 지어주었습니다.
  미어캣처럼 현장을 살펴보고 요청에 빠르게 응답하기 때문입니다!
  서비스 화면 속 미어캣 이미지도 주목해주세요.
  ```

<br>

## 🎍 거기어때 서비스 화면

### 제공자

- 정보를 제공하고자 하는 사용자는 해당 위치에 제공자 마커🐹를 등록합니다.
- 등록할 위치를 기준으로 제공자가 500m 이내에 있는지 위치인증을 합니다.
- 위치인증을 거친 후 등록이 완료되면 지도에 마커가 생성됩니다.
- 위치인증에 실패하면 마커를 등록할 수 없습니다.
- 마커의 유효시간을 설정할 수 있으며 언제든지 수정 및 삭제가 가능합니다.

  [마커 등록, 조회, 수정, 삭제]
   
  ![마커등록성공](https://user-images.githubusercontent.com/110139421/222969495-44d04d07-4275-4cc2-879a-5464a7cb6aa9.gif)
  
  [위치인증 실패 > 마커 등록 실패]

  ![마커등록실패](https://user-images.githubusercontent.com/110139421/222969506-447f059b-e658-42b2-adf1-122e6000fab7.gif)

<br>

### 요청자

- 궁금한 장소의 위치에 요청폼을 등록합니다.
- 요청폼에는 요청 메세지와 거래할 코인의 양을 기재합니다.
- 2분 이내로 제공자와 매칭되면 거래가 시작됩니다.
- 2분이 초과할 경우 해당 요청은 종료됩니다.

  ![요청수락실패](https://user-images.githubusercontent.com/110139421/222969697-c5e06134-3454-4cec-a98e-90b8bc848be7.gif)

<br>

### 일대일 화상채팅 및 Push 알림

- 요청된 위치를 기준으로 1km이내 제공자들에게 Push 알림으로 요청이 전달됩니다.
- 제공자가 요청을 수락하면 곧바로 일대일 화상채팅이 연결됩니다.
- 실시간 화상연결, 채팅, 화면전환, 마이크 끄기 기능을 지원합니다.
- 브라우저를 꺼놓더라도 Push 알림으로 요청을 전달합니다.

  [사이트 비활성화시]

  ![요청](https://user-images.githubusercontent.com/110139421/222969572-e7510201-ac0d-49b7-876d-27850f292ddd.gif)

  [사이트 활성화시]

  ![요청2](https://user-images.githubusercontent.com/110139421/222969602-bfaedfbb-9050-4bd4-bbd3-e5252424a23b.gif)

<br>

### 코인 충전

- 요청을 하려면 코인이 필요합니다!
- 신용카드 결제 및 네이버페이, 카카오페이 등을 통해 코인을 충전합니다.
- 거래에 소비된 코인은 제공자🐹에게 전달됩니다.

  ![결제](https://user-images.githubusercontent.com/110139421/222969433-9a3d21a7-42b9-4068-a048-2bcbe1a989ab.gif)

<br>

### 마이페이지

- 현재 보유 중인 코인을 조회합니다.
- 히스토리 조회를 제공합니다! 제공자🐹로서의 이력과 요청자로서의 이력을 각각 조회할 수 있습니다.
- 코인 충전, 환전 버튼을 클릭하여 해당 기능으로 이동할 수 있습니다.

  ![마이페이지](https://user-images.githubusercontent.com/110139421/222969464-192c6f12-8713-41e8-ae68-120163d582b9.gif)

<br>

## ⚒️ 주요 기술

### Backend

- Spring Boot
- IntelliJ IDE
- Springboot 2.7.8
- Maven 3.6.3
- Spring Data JPA
- Spring Security
- Spring Validation
- Spring Web
- QueryDSL
- Netty Socket.io
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
- Firebase Cloud Messeging - Push 알림
- Kakao Map

<br>

## 📁 프로젝트 파일 구조

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

## 📚 기획 및 설계 산출물

- [와이어프레임](https://www.figma.com/file/ywgTAkO13oveEFtmKCT3Og/furniture-web-desjgn-(Community))

- [요구사항 명세서](https://www.notion.so/936183033cf8421ebf567aa7d7204932)

- ERD   
  <img src="https://github.com/jis22u/Meerkat/assets/110139421/44d6872d-8703-4562-beb5-d01e93026111" width="800" height="450"/>

