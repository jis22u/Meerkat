import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const OnlyHeaderLayout = () => {
    const { isLogin } = useSelector((state) => state.auth)
    const pathname = window.location.pathname

    return (
        <div>
            <Header />

            <main className=''>
                { !isLogin ? <Navigate to="/login" replace = { true } state = {{ path : pathname }} /> : < Outlet /> }
            </main>
            
        </div>
    );
};

export default OnlyHeaderLayout;