import classes from "./Header.module.css";
import {Link} from "react-router-dom";
 
const Header = () => {
  return (
    <header>
      <div className={classes.brown}></div>
      <Link to="/">
        <img src="img/logo.png" alt="logo" className={classes.img}></img>
      </Link>
      <div className={classes.brown}></div>
    </header>
  );
}

export default Header;