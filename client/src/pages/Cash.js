import React, { useState} from 'react';
import Payment from 'components/cash/Payment';
import { useEffect } from 'react';
import { getCoin } from 'api/user'

const Cash = () => {
  const [cash , setCash] = useState(0);
  const [mycoin , setMyCoin] = useState(0); // 받아온 코인 데이터를 초기값으로
  const [coin, setCoin] = useState();
  

  
    useEffect(() => {

      const init = async () => {
        const { data } = await getCoin()
        setCoin(data.value)
      }
      init()
    })
    // 1. API로 사용자의 보유 코인 데이터 받아오기


    const handleCashUpdate_1000 = () => {
      setCash(prev => prev + 1100)
      setMyCoin(prev => prev + 5)
    }

    const handleCashUpdate_3000 = () => {
      setCash(prev => prev + 3300)
      setMyCoin(prev => prev + 15)
    }

    const handleCashUpdate_5000 = () => {
      setCash(prev => prev + 5500)
      setMyCoin(prev => prev + 25)
    }

    const handleCashUpdate_10000 = () => {
      setCash(prev => prev + 11000)
      setMyCoin(prev => prev + 50)
    }

    return (
      <div>
        {coin && 
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
                  <Payment cash={cash} mycoin={mycoin}/>
                </div>
            </div>}
      </div>
    );
};

export default Cash;
