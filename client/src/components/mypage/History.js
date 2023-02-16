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
    <div className="extendBox">
      <h2>거래내역</h2>
      <div className="hBox">
        <button className="btn" onClick={meerkatButtonHandler}>미어캣</button>
        <button className="btn" onClick={requestButtonHandler}>요청</button>
      </div>
      {IsMeerkat &&(
        <div className="box">
          {props.responseList.map((Info) => (
            <HistoryComponent key={Info.location} Info={Info} IsMeerkat={IsMeerkat}/>
          ))}
        </div>
      )}
      {!IsMeerkat && (
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
