import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header'
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';


const VideoLayout = () => {
    const { isLogin } = useSelector((state) => state.auth)
    const location = useLocation()
    const pathname = location.pathname

    return (
        <div className='body'>
                <div className=''>
                    { !isLogin ? <Navigate to="/login" replace = { true } state = {{ path : pathname }} /> : < Outlet /> }
                </div>
            
        </div>
    );
};

export default VideoLayout;