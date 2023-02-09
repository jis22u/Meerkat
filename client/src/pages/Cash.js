import React, { useState, useContext, useMemo, useRef } from 'react';
import axios from 'axios';

const Cash = () => {

    const coin = useContext('CoinContext');
    // 보유 코인 데이터 받아오기

    const [cash , setCash] = useState(1100);
    const [mycoin , setMyCoin] = useState(0); // 받아온 코인 데이터를 초기값으로

    const handleCashUpdate_1000 = () => {
      setCash(1100)
      setMyCoin(5)
    }

    const handleCashUpdate_3000 = () => {
      setCash(3300)
      setMyCoin(15)
    }

    const handleCashUpdate_5000 = () => {
      setCash(5500)
      setMyCoin(25)
    }

    const handleCashUpdate_10000 = () => {
      setCash(11000)
      setMyCoin(50)
    }

    const sendCash = async () => {
      try {
        const response = await axios.post('http://localhost:3000', {data : {cash}}).then(res=>console.log(res));
        console.log(response);
      } catch(e) {
        console.error(e);
      }
    }

    return (
        <div>
            cash 충전입니다.
            <h1> 코인 충전 </h1>
            <p></p>
            <span> 보유 코인 {coin}</span>
            <p></p>
            <h3> 충전금액 선택 </h3>
            <button onClick={handleCashUpdate_1000}>1000원</button>
            <button onClick={handleCashUpdate_3000}>3000원</button>
            <button onClick={handleCashUpdate_5000}>5000원</button>
            <button onClick={handleCashUpdate_10000}>10000원</button>
            <p></p>
            <span> +{mycoin} coin </span>
            <p></p>
            <h3>총 결제 금액 : {cash} 원</h3>
            <p></p>
            <div>
              <button onClick={sendCash}> 충전하기 </button>
            </div>
        </div>
    );
};

export default Cash;
