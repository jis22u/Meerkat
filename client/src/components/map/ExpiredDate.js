import moment from "moment";
import { useState } from "react";

const ExpiredDate = (props) => {
  let date = new Date();
  let array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  let [endDate, setEndDate] = useState();

  const checkDate = () => {
    setEndDate(
      props.hourSelect.current.value < date.getHours() ||
        props.hourSelect.current.value === "24"
        ? moment().add(1, "d").format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD")
    );
  };

  return (
    <div>
      <h3>종료시간</h3>
      <div>
        <p>{endDate}</p>
        <select ref={props.hourSelect} onChange={checkDate} defaultValue={date.getHours()}>
          {array.map((item) => (
            <option value={item} key={item}>
              {item}:00시까지
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpiredDate;
