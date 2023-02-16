
import { useLocation } from "react-router";
import Charge from "components/cash/Charge";
import Exchange from "components/cash/Exchange";

const Cash = () => {
  const params = useLocation();
  const check = params.state.check;


  return (
    <div className="box">
      {check && <Charge></Charge>}
      {!check && <Exchange></Exchange>}
    </div>
  );
};

export default Cash;
