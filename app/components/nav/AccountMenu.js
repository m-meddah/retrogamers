import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import { Link } from '@mui/material';
import Image from 'next/image'
import koala from '../../public/images/avatar_koala.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AccountMenu({ showLogin, showSignIn, userConnect}) {

  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState([]);
  const open = Boolean(anchorEl);

  const logout = () => {
    console.log("logged out");
    window.localStorage.clear();
    router.reload();
  };

  React.useEffect(() => {
  if (localStorage.user) {
   const userInfo = JSON.parse(localStorage.user);
    setUser(userInfo)
  }
  }, [userConnect]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Mon profil">
          <IconButton
            onClick={handleClick}
            onClose={handleClose}
            size="small"
            sx={{ ml: 2, backgroundColor:"white" }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 45, height: 45 }}>
              {userConnect ?
              (<Image
              src={koala}
              />)
              :
              (<AccountCircleIcon sx={{ width: 45, height: 45 }}/>)
              }
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 50,
              height: 50,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              justifyContent: 'center',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
                {userConnect ?
                (<div><MenuItem sx={{ justifyContent: 'center' }}>
                  <Link href={`/profil/${user.id}`} >
                  <a>
                  <Button variant="outlined">
                    Mon profil
                  </Button>
                  </a>
                  </Link>
                   </MenuItem>
                   <Divider />
                   <MenuItem sx={{ justifyContent: 'center' }}>
                    <ListItemIcon>
                      <Button onClick={logout} variant="outlined" startIcon={<Logout />}>
                        Déconnexion
                      </Button>
                    </ListItemIcon>
                    </MenuItem></div>)
                :
                (<div><MenuItem sx={{ justifyContent: 'center' }}>
            <Button onClick={showLogin} variant="outlined">
              Connexion
            </Button>
          </MenuItem><Divider /><MenuItem sx={{ justifyContent: 'center' }}>
              <Button onClick={showSignIn} variant="outlined">
                Inscription
              </Button>
            </MenuItem></div>)}

      </Menu>
    </div>
  );
}
