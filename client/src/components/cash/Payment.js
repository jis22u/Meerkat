import React from 'react';
import { chargeCoin } from 'api/user'
import Swal from 'sweetalert2'
import classes from "./Payment.module.css"
import { useNavigate } from 'react-router';


const  Payment = ({cash, mycoin})=> {
  const navigate = useNavigate()
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


    const { IMP } = window;
    IMP.init('imp21887438');


    const data = {
        pg : 'html5_inicis.INIpayTest',
        pay_method : 'card', 
        merchant_uid: uuid,   
        name : '코인 충전',
        amount : cash,
        buyer_email : 'test@portone.io',
        buyer_name : '구매자이름',               
        buyer_tel : '010-1234-5678',             
        buyer_addr : '대전 유성구 동서대로 98-39 (덕명동)',     
        buyer_postcode : '123-456',               
        
    };


    IMP.request_pay(data, (response) => {
        
        const { success, error_msg } = response;
   
        if (success) {
          chargeCoin({ coin : mycoin })
            .then(({data}) => {
              if (data.status === 'OK'){
                navigate('/mypage')
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: '결제가 처리 되었습니다.',
                  showConfirmButton: false,
                  timer: 1500
                })
              } else {
                Swal.fire({
                  position: 'center',
                  icon: data.status,
                  title: '결제가 실패 되었습니다.',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
          

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
    <button className={classes.btn} onClick={onClickPayment}>결제하기</button>
  );
}

export default Payment;