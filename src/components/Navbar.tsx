import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            토익영단어암기
          </Typography>
          <NavLink to="/test">
            <Button variant="contained" disableElevation>
              테스트
            </Button>
          </NavLink>
          <NavLink to="/wrong">
            <Button variant="contained" disableElevation>
              틀린단어
            </Button>
          </NavLink>
          <NavLink to="/">
            <Button variant="contained" disableElevation>
              로그인
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
