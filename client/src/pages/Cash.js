import React, { useState } from "react";
import Payment from "components/cash/Payment";
import { useEffect } from "react";
import { getCoin } from "api/user";
import classes from "./Cash.module.css";
import { useLocation } from "react-router";
import Charge from "components/cash/Charge";
import Exchange from "components/cash/Exchange";

const Cash = () => {
  const params = useLocation();
  const check = params.state.check;


  return (
    <div className="box">
      {check && <Charge></Charge>}
      {!check && <Exchange></Exchange>}
    </div>
  );
};

export default Cash;
