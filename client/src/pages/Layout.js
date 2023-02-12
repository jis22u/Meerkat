import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const Layout = () => {
    const { isLogin } = useSelector((state) => state.auth)
    const pathname = window.location.pathname

    return (
        <div className='body'>
            <Header />

            <main className=''>
                { !isLogin ? <Navigate to="/login" replace = { true } state = {{ path : pathname }} /> : < Outlet /> }
            </main>
            
            <Footer />
        </div>
    );
};

export default Layout;