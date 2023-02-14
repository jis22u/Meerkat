import { useState } from "react";
import HistoryComponent from "./HistoryComponent";

const History = (props) => {
  const [IsMeerkat, setIsMeerkat] = useState(true);

  const meerkatButtonHandler = () => {
    setIsMeerkat(true);
  };

  const requestButtonHandler = () => {
    setIsMeerkat(false);
  };

  return (
    <div className="box">
      <h2>거래내역</h2>
      <div className="hBox">
        <button onClick={meerkatButtonHandler}>미어캣</button>
        <button onClick={requestButtonHandler}>요청</button>
      </div>
      {IsMeerkat && props.responseList&&(
        <div className="box">
          {props.responseList.map((Info) => (
            <HistoryComponent key={Info.location} Info={Info} IsMeerkat={IsMeerkat}/>
          ))}
        </div>
      )}
      {!IsMeerkat && props.requestList && (
        <div className="box">
          {props.requestList.map((Info) => (
            <HistoryComponent key={Info.location}  Info={Info} IsMeerkat={IsMeerkat}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
