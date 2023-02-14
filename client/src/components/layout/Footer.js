import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState} from "react";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HistoryIcon from "@mui/icons-material/History";
import { createTheme } from "@mui/system";

const Footer = () => {

  const meerkat = createTheme({
    palette: {
      background: {
        default: "#F2E6C7"
      }
    }
  });
  
  const pathname = window.location.pathname
  const [selected, setSelected] = useState(pathname);

  return (
    <footer>
      <BottomNavigation
        sx={{ height: 80 }}
        theme={meerkat}
        showLabels
        value={selected}
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
      >
        <BottomNavigationAction 
          label="홈"
          icon={<HomeIcon sx={{ color: "F2E6C7" }} />}
          component={Link}
          to="/"
          id="icon"
          value = "/"
        />
        <BottomNavigationAction
        
          label="마이페이지"
          icon={<ContactPageIcon />}
          component={Link}
          to="/mypage"
          value = "/mypage"
        />
        <BottomNavigationAction
          label="등록내역"
          icon={<HistoryIcon />}
          component={Link}
          to="/registration-detail"
          value = "/registration-detail"

        />
        <BottomNavigationAction
          label="코인"
          icon={<LocalAtmIcon />}
          component={Link}
          to="/cash"
          value = "/cash"

        />
      </BottomNavigation>
    </footer>
  );
};

export default Footer;
