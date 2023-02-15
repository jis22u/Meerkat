import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const clickHandler = (choice) => {
    navigate("/map", {state:{check:choice}});
  };

  return (
    <div className="box">
      <div>
        <img className={classes.explain} alt="" src="img/meerkat_explain.png" />
        <button className={classes.choiceBtn} onClick={() => clickHandler(true)}>
          <img className={classes.profile} alt="" src="img/meerkat_profile.png"></img>
        </button>
      </div>
      <div>
        <img alt="" className={classes.explain} src="img/request_explain.png" />
        <button className={classes.choiceBtn} onClick={() => clickHandler(false)}>
          <img alt="" className={classes.profile} src="img/request_profile.png"></img>
        </button>
      </div>
    </div>
  );
};

export default Home;
