import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';


const Layout = () => {
    const { isLogin } = useSelector((state) => state.auth)
    const location = useLocation()
    const pathname = location.pathname

    return (
        <div className='body'>
            <Header />
            
                <main className=''>
                    { !isLogin ? <Navigate to="/login" replace = { true } state = {{ path : pathname }} /> : < Outlet /> }
                </main>
            
            { (pathname !== '/map' && pathname !== '/hangup' && !pathname.includes('/room'))
            && <Footer /> }
        </div>
    );
};

export default Layout;