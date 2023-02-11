import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header'
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';



const Layout = () => {
    const { isLogin } = useSelector((state) => state.auth)
    const { state } = useLocation();
    
    return (
        <div>
            <Header />

            <main>
                { isLogin ? <Navigate to= { state.path } replace /> : < Outlet /> }
            </main>
            
        </div>
    );
};

export default Layout;