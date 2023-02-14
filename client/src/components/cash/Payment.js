import React from 'react';
import { chargeCoin } from 'api/user'
import Swal from 'sweetalert2'

// 결제 API
const  Payment = ({cash, mycoin})=> {
  function guid() {
    const s4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }


  function onClickPayment() {
    let uuid = guid();
    console.log(uuid);

    /* 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp21887438');

    /* 결제 데이터 정의하기 */
    const data = {
        // pg : 'kakaopay.TC0ONETIME',
        pg : 'html5_inicis.INIpayTest',
        pay_method : 'card',  //생략가
        merchant_uid: uuid,   //상점에서 생성한 고유 주문번호
        name : '코인 충전',
        amount : cash,
        buyer_email : 'test@portone.io',
        buyer_name : '구매자이름',                  // 사용자 id 넣어주세요
        buyer_tel : '010-1234-5678',               // 사용자 전화번호 넣어주세요
        buyer_addr : '대전 유성구 동서대로 98-39 (덕명동)',     
        buyer_postcode : '123-456',               
        
    };

    console.log(IMP);
    console.log(data);
    
    /* 결제 창 호출하기 */
    IMP.request_pay(data, (response) => {
        
        const { success, error_msg } = response;
   
        if (success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "결제 성공!",
            showConfirmButton: false,
            timer: 1500
          })
          console.log(cash)
          chargeCoin({ coin : mycoin })


        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `결제 실패: ${error_msg}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }


  return (
    <button onClick={onClickPayment}>결제하기</button>
  );
}

export default Payment;