import {useRef} from "react";
import classes from "./SearchInput.module.css";

const SearchInput = (props) => {

    const buttonHandler = () => {
      console.log(inputValue.current.value + "를 검색할거야");
      props.search(inputValue.current.value);
      inputValue.current.value = "";
    };

    const inputValue = useRef();

    return <div className={classes.input}> 
        <input type="text" ref={inputValue} ></input>
        <button onClick={buttonHandler}>검색</button>
    </div>
}

export default SearchInput;