import { Link } from "react-router-dom";
import { useState} from "react";
import { createTheme } from "@mui/system";
import classes from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const meerkat = createTheme({
    palette: {
      background: {
        default: "#F2E6C7"
      }
    }
  });
  
  return (
    <footer className="hBox">
      <Link to="/"><img className={classes.img} src="img/home_icon.png"/></Link>
      <Link to="/mypage"><img className={classes.img} src="img/mypage_icon.png"/></Link>
      <Link to="/registration-detail"><img className={classes.img} src="img/book_icon.png"/></Link>
      <img onClick={() => navigate("/cash", {state:{check:true}})} className={classes.img} src="img/coin_icon.png"/>
    </footer>
  );
};

export default Footer;
