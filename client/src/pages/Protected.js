import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const Protected = ({ children }) => {
    const { isLogin } = useSelector((state) => state.auth)
    
      if (!isLogin) {
        return <Navigate to="/login" replace />;
      }
      return children;
    };

export default Protected;