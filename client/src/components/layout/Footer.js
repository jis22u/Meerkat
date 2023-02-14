import { Link } from "react-router-dom";
import { useState} from "react";
import { createTheme } from "@mui/system";
import classes from "./Footer.module.css";

const Footer = () => {

  const meerkat = createTheme({
    palette: {
      background: {
        default: "#F2E6C7"
      }
    }
  });
  
  const pathname = window.location.pathname
  const [selected, setSelected] = useState(pathname);

  return (
    <footer className="hBox">
      <Link to="/"><img className={classes.img} src="img/home_icon.png"/></Link>
      <Link to="/mypage"><img className={classes.img} src="img/mypage_icon.png"/></Link>
      <Link to="/registration-detail"><img className={classes.img} src="img/book_icon.png"/></Link>
      <Link to="/cash"><img className={classes.img} src="img/coin_icon.png"/></Link>
    </footer>
  );
};

export default Footer;
