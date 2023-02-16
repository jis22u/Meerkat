import React, { useState } from "react";
import { useEffect } from "react";
import { getCoin } from "api/user";
import classes from "./Charge.module.css";
import Swal from "sweetalert2";

const Exchange = () => {
  const [balance, setBalance] = useState(0);
  const [myMoney, setMyMoney] = useState(0); // 받아온 코인 데이터를 초기값으로
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await getCoin();
      setCoin(data.value);
      setBalance(data.value);
    };
    init();
  },[]);
  // 1. API로 사용자의 보유 코인 데이터 받아오기

  const handlebalanceUpdate = (coin) => {
    if (balance - coin < 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "보유코인이 모자랍니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setBalance((prev) => prev - coin);
    setMyMoney((prev) => prev + (180*coin));
  };

  return (
    <div className="extendBox2">
      {coin !== null && (
        <div className={classes.box}>
          <h1 className="title"> 코인 환전 </h1>
          <div className="customBox">
            <span> 보유 코인 {coin}</span>
            <h3> 환전코인 선택 </h3>
            <div className="hBox">
              <button
                className={classes.btn}
                onClick={(e) => {handlebalanceUpdate(5)}}
              >
                5coin
              </button>
              <button
                className={classes.btn}
                onClick={(e) => {handlebalanceUpdate(10)}}
              >
                50coin
              </button>
              <button
                className={classes.btn}
                onClick={(e) => {handlebalanceUpdate(100)}}
              >
                100coin
              </button>
              <button
                className={classes.btn}
                onClick={(e) => {handlebalanceUpdate(200)}}
              >
                200coin
              </button>
            </div>
            <h3>잔액</h3>
            <div>
              <h1 className={classes.chargeCoin}> {balance} coin</h1>
            </div>
            <h3>나의 예상 수익</h3>
            <div className={classes.chargeCoin}>
              <h1> {myMoney} 원 </h1>
            </div>
            <div>* 코인 1개당 KRW 200으로 계산됩니다.</div>
            <div>* 수익 분배 비율은 사용자 8, 거기어때 2로 측정됩니다.</div>
            <br />
            <div>
                <button className={classes.exchangeBtn}>환전하기</button>
            </div>
          </div>
          <br></br>
        </div>
      )}
    </div>
  );
};

export default Exchange;
