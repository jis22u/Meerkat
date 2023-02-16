import {useRef} from "react";
import classes from "./SearchInput.module.css";

const SearchInput = (props) => {

    const buttonHandler = () => {
      console.log(inputValue.current.value + "를 검색할거야");
      props.search(inputValue.current.value);
      inputValue.current.value = "";
    };

    const inputValue = useRef();

    const onKeyPress = () => {
      buttonHandler();
    }

    return (
      <div className={classes.input}>
        <input type="text" ref={inputValue} className={classes.inputWindow} onKeyPress={onKeyPress} placeholder="장소를 구체적으로 입력해주세요."></input>
        <button onClick={buttonHandler} className={classes.searchBtn}>
          검색
        </button>
      </div>
    );
}

export default SearchInput;