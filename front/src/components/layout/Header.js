

// const Header = () => {
//     return (
//         <header>
//             Header입니다.
//         </header>
//     );
// };

// export default Header

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// 거기어때 글씨 중앙정렬

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography align="center" variant="h6" color="inherit" component="div">
            거기어때
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}