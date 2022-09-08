/* eslint-disable react/jsx-key */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import HomeIcon from '@mui/icons-material/Home';

const pages = ['Profil', 'Contact'];


const BarMenu = ({ showLogin, showSignIn, userConnect }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
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
                    <MenuItem key='acceuil' onClick={handleCloseNavMenu}>
                        <Link href='/'>
                        <a><Typography textAlign="center">ACCEUIL</Typography></a>
                        </Link>
                    </MenuItem>
                    <MenuItem key="contact" onClick={handleCloseNavMenu}>
                        <Link href={"/contact"}>
                        <a><Typography textAlign="center">CONTACT</Typography></a>
                        </Link>
                    </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link href='/'>
                    <a><HomeIcon fontSize="large" sx={{ my: 2, color: 'white', display: 'block' }} /></a>
          </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
              <AccountMenu showLogin={showLogin} showSignIn={showSignIn} userConnect={userConnect} />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default BarMenu;
