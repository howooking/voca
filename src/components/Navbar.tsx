import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
} from '@mui/material';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, onUserChange } from '../api/firebase';

export default function Navbar(): JSX.Element {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onUserChange(setUser);
  }, []);

  return (
    <AppBar position="static" elevation={2} color="secondary">
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">
          <SpellcheckIcon />
        </Link>
        <Typography flexGrow={1} variant="h6" fontWeight="bold">
          <Link to="/">영단어암기</Link>
        </Typography>
        <Button
          variant="contained"
          disableElevation
          sx={{ fontSize: 17, fontWeight: 'bold' }}
          color="secondary"
        >
          <Link to="/test">테스트</Link>
        </Button>

        <Button
          variant="contained"
          disableElevation
          sx={{ fontSize: 17, fontWeight: 'bold' }}
          color="secondary"
        >
          <Link to="/wrong">틀린단어</Link>
        </Button>
        {user && <Avatar src={user.photoURL} alt="avatar" sx={{ m: 2 }} />}
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
    </AppBar>
  );
}
