import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import classes from "./SelectCoin.module.css";

const SelectCoin = (props) => {
  //설정된 코인 값 바꾸기
  function valuetext(value) {
    props.setCoin(value);
  }
  return (
    <Box sx={{mx:3}}>
      <div className={classes.coinView}>
        <h3>금액</h3>
        <h3>{props.coin}</h3>
      </div>
      <Slider
        aria-label="Coin"
        defaultValue={10}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={5}
        marks
        min={5}
        max={25}
      />
    </Box>
  );
};
export default SelectCoin;
