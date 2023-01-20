import { Link, Outlet } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <Outlet />
            <Link to="/">Home</Link> | 
            <Link to="/MyPage">MyPage</Link>
        </div>
    );
};

export default Footer; 