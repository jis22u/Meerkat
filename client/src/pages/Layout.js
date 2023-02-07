import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'


const Layout = () => {
    const path = window.location.pathname
    // Login 여부에 따라 render 또는 Login page로 보내기 => Login 후 그 전 페이지로 돌려 보내기 (useEffect 사용)

    return (
        <div>
            <Header />

            <main>
                <Outlet /> 
            </main>

            {path !== '/map' && <Footer />}
        </div>
    );
};

export default Layout;