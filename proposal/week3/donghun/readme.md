## 2023-01-25
### 1. ERD 제작

![image.png](./image.png)

### 2. SSAFY 측 제공 EC2 ssh 접근 확인 완료
    2-1) docker를 이용한 이미지 올릴 예정
    - Jenkins
    - Nginx
    - MySQL

<hr/>

## 2023-01-26
### 1. FCM 테스트
![image-1.png](./image-1.png)

1-1) (Firebase Console) 테스트 성공
- FCM TOKEN은 Console에서 획득 성공. Firebase Console에서 Test 완료 후 JSON 수신 확인 완료
- ACCESS TOKEN / REFRRESH TOKEN은 OAUTH 2.0 Playground에서 임시로 확보 후 Test하였음
- Push가 안되는 문제 해결 필요. Service Workers는 제대로 켜져 있는 듯 한데, 문제가 무엇일까

1-2) (Postman) 테스트 성공
![image-2.png](./image-2.png)
- API 통신으로 Browser의 Console에 JSON 수신 확인 완료
- Push가 안되는 문제 해결 필요. Service Workers는 제대로 켜져 있는 듯 한데, 문제가 무엇일까

1-3) 비슷한 개념 키워드
- PWA
- web push 라이브러리
