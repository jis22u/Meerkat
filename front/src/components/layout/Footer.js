import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to="/">홈</Link>  |
            <Link to="/mypage">마이페이지</Link>    |
            <Link to="/cash">캐시충전</Link>
        </footer>
    );
};

export default Footer;