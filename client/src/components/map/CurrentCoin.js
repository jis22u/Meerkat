
import classes from "./CurrentCoin.module.css";
import PaidIcon from '@mui/icons-material/Paid';

const CurrentCoin = ({coin}) => {

  return (
    <div className={classes.coinBox}>
      &nbsp;
      <PaidIcon />
      <h3 >현재코인 : { coin } </h3>
      &nbsp;
      &nbsp;
    </div>
  );
};

export default CurrentCoin;
