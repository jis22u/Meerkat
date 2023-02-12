import React from 'react';

const  Payment = ({cash})=> {
  function onClickPayment() {

    /* 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp21887438');

    /* 결제 데이터 정의하기 */
    const data = {
        // pg : 'kakaopay.TC0ONETIME',
        pg : 'html5_inicis.INIpayTest',
        pay_method : 'card',  //생략가
        merchant_uid: "order_no_0001", //상점에서 생성한 고유 주문번호
        name : '주문명: 코인 충전',
        amount : cash,
        buyer_email : 'test@portone.io',
        buyer_name : '구매자이름',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456',
        
    };
    console.log(IMP);
    console.log(data);
    /* 결제 창 호출하기 */
    IMP.request_pay(data, (response) => {
        
        const { success, error_msg } = response;
   
        if (success) {
          alert('결제 성공');
          // 2. 결제 후, 해당 사용자의 코인 내역 업데이트 요청 보내기
        } else {
          alert(`결제 실패: ${error_msg}`);
        }
      });
    }


  return (
    <button onClick={onClickPayment}>결제하기</button>
  );
}

export default Payment;