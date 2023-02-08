import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const Layout = () => {
    const { isLogin } = useSelector((state) => state.auth)

    return (
        <div>
            <Header />

            <main>
                {}
                { isLogin ? <Navigate to="/" replace /> : < Outlet /> }
            </main>
        </div>
    );
};

export default Layout;