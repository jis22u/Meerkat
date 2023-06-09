import React, { useState } from "react";
import Payment from "./Payment";
import { useEffect } from "react";
import { getCoin } from "api/user";
import classes from "./Charge.module.css";

const Charge = () => {
  const [cash, setCash] = useState(0);
  const [mycoin, setMyCoin] = useState(0); 
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await getCoin();
      setCoin(data.value);
    };
    init();
  });


  const handleCashUpdate_1000 = () => {
    setCash((prev) => prev + 1100);
    setMyCoin((prev) => prev + 5);
  };

  const handleCashUpdate_3000 = () => {
    setCash((prev) => prev + 3300);
    setMyCoin((prev) => prev + 15);
  };

  const handleCashUpdate_5000 = () => {
    setCash((prev) => prev + 5500);
    setMyCoin((prev) => prev + 25);
  };

  const handleCashUpdate_10000 = () => {
    setCash((prev) => prev + 11000);
    setMyCoin((prev) => prev + 50);
  };

  const handleCashUpdate_0 = () => {
    setCash(0)
    setMyCoin(0)
  }

  return (
    <div className="extendBox2">
      {coin !== null && (
        <div className={classes.box}>
          <h1 className="title"> 코인 충전 </h1>
          <div className="customBox">
            <span className={classes.currentCoinTitle}> 보유 코인 {coin}</span>
            <h2> 충전금액 선택 </h2>
            <div className="hBox">
              <button className={classes.btn} onClick={handleCashUpdate_1000}>
                1000원
              </button>
              <button className={classes.btn} onClick={handleCashUpdate_3000}>
                3000원
              </button>
              <button className={classes.btn} onClick={handleCashUpdate_5000}>
                5000원
              </button>
              <button className={classes.btn} onClick={handleCashUpdate_10000}>
                10000원
              </button>
            </div>
            <div className={classes.chargeCoin}>
              <h1> +{mycoin} coin </h1>
              <button
                onClick={handleCashUpdate_0}
                style={{ marginLeft: "10px" }}
              >
                초기화
              </button>
            </div>
            <div>* KRW 200당 코인 1개로 계산됩니다.</div>
            <br />
            <h2>총 결제 금액</h2>
            <div>
              <h1 className={classes.chargeCoin}> {cash} 원</h1>
            </div>
            <div>* 결제금액은 충전금액과 카드수수료가 포함됩니다.</div>
            <br />
            <div>
              <Payment cash={cash} mycoin={mycoin} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Charge;
