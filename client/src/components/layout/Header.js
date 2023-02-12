import classes from "./Header.module.css";
import {Link} from "react-router-dom";
 
const Header = () => {
  return (
    <header>
      <div className={classes.brown}></div>
      <img src= {process.env.PUBLIC_URL + "/img/logo.png"} alt="logo" className={classes.img}></img>
      <div className={classes.brown}></div>
    </header>
  );
}

export default Header;