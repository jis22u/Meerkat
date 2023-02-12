import { setChoice } from "store/modules/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (choice) => {
    dispatch(setChoice(choice));
    navigate("/map");
  };

  return (
    <div className={classes.box}>
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
