import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const Footer = () => {
    const [selected , setSelected] = useState(0);
    // 새로고침 할 때 Home으로 돌아가지는 것을 막아야함 (로컬 스토리지 이용하면 해결될 듯?)
    return (
        <footer>
            <BottomNavigation
              showLabels
              value={selected}
              onChange={(event, newValue) => {
                setSelected(newValue);
              }}
            >
              <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
              <BottomNavigationAction label="My Page" icon={<ContactPageIcon />} component={Link} to="/mypage" />
              <BottomNavigationAction label="Cash" icon={<LocalAtmIcon />} component={Link} to="/cash"/>
            </BottomNavigation>
        </footer>
    );
};

export default Footer;