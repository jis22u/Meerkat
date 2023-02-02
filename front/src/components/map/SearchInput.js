import {useRef} from "react";
import classes from "./SearchInput.module.css";

const SearchInput = (props) => {

    const search = () => {
        console.log(inputValue.current.value + "를 검색할거야");
        props.Search(inputValue.current.value);
        inputValue.current.value = "";
    }

    const inputValue = useRef();

    return <div className={classes.input}> 
        <input type="text" ref={inputValue} ></input>
        <button onClick={search} for="input">검색</button>
    </div>
}

export default SearchInput;