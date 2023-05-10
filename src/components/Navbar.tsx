import {
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Toolbar,
  Box,
  AppBar,
  MenuItem,
} from '@mui/material/';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { useAuthContext } from '../context/defaultAuthContext';

const pages = [
  {
    title: '테스트',
    to: '/test',
  },
  {
    title: '틀린단어',
    to: '/wrong',
  },
];

export default function Navbar(): JSX.Element {
  const { user, login, logout } = useAuthContext();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <SpellcheckIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 600,
              }}
            >
              영단어암기
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.to} onClick={handleCloseNavMenu}>
                  <Link to={page.to}>
                    <Typography textAlign="center" variant="h6" color="black">
                      {page.title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
          >
            <SpellcheckIcon sx={{ display: { xs: 'flex', md: 'none' } }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontWeight: 600,
              }}
            >
              영단어암기
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                onClick={handleCloseNavMenu}
                key={page.to}
                variant="contained"
                disableElevation
                sx={{ fontSize: 17, fontWeight: 'bold' }}
                color="secondary"
              >
                <Link to={page.to}>{page.title}</Link>
              </Button>
            ))}
          </Box>
          {user?.photoURL && <Avatar src={user.photoURL} alt="avatar" />}
          {user ? (
            <IconButton onClick={logout}>
              <LogoutIcon sx={{ color: 'white' }} />
            </IconButton>
          ) : (
            <IconButton onClick={login}>
              <LoginIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
