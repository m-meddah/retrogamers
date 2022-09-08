import React, {useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';


export default function FormLogin({ open, close, onSubmit, logResult }) {

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [showP, setshowP] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setshowP({
      showPassword: !showP.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (

    <div>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 'auto',
          },
        }}
      >
      <Dialog open={open} >
      <form onSubmit={handleSubmit(onSubmit)}  >
        <DialogTitle>Formulaire de connection</DialogTitle>
        <DialogContent sx={{ overflow: 'hidden' }}>
        <Controller
            name="email"
            control={control}
            render={({ field }) =>
            <FormControl  {...field} required sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              endAdornment={
                <InputAdornment position="end">
                  <EmailIcon/>
                </InputAdornment>
              }
              label="Email"
            />
            </FormControl>
            }
        />
         <Controller
            name="password"
            control={control}
            render={({ field }) =>
            <FormControl  {...field} required min="8" sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={showP.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showP.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
            }
            label="Mot de passe"
          />
          <FormHelperText>Le mot de passe doit comporter au minimum 8 caractères</FormHelperText>
        </FormControl>
            }
        />
         <div>
        {logResult  ? <div></div>
         :
         <Alert severity="error">Votre email ou votre mot de passe est incorect !</Alert>
         }
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Annuler</Button>
          <Button type="submit">Se connecter</Button>
        </DialogActions>
        </form>
        </Dialog>
        </Box>
    </div>
  );
}
