import React, {useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/router';
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


export default function FormSignIn({ open, close }) {

  const router = useRouter()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    }
  });

  const [showP, setshowP] = useState({
    showPassword: false,
  });

  const [logResult, setlogResult] = useState({
    succes: null,
  });

  const handleClickShowPassword = () => {
    setshowP({
      showPassword: !showP.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const onSubmit = data => {
      const dataUser = JSON.stringify(data)

        if (dataUser) {
          console.log(data);
          console.log(dataUser);

            fetch("http://localhost:3080/api/users", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: dataUser,
          })
          .then(res => {
            if (res.statusCode === 200 || 204){
              console.log('Bienvenue tu es inscrit')
              setlogResult(true);
              router.reload(window.location.pathname)
              router.push("/")
            }
          })
          .catch((err) => console.log(err))
          setlogResult(false);
          }}

  return (

    <div>
      <Dialog open={open} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Formulaire d'inscription</DialogTitle>
        <DialogContent sx={{ overflow: 'hidden' }}>
        <Controller
            name="firstname"
            control={control}
            render={({ field }) =>
            <FormControl {...field} required sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-firstname">Prénom</InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstname"
              type="text"
              label="Prénom"
            />
            <FormHelperText>Renseigner votre prénom</FormHelperText>
            </FormControl>}
        />
        <Controller
            name="lastname"
            control={control}
            render={({ field }) =>
            <FormControl  {...field} required sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lastname">Nom</InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastname"
              type="text"
              label="Nom"
            />
            <FormHelperText>Renseigner votre nom</FormHelperText>
            </FormControl>}
        />
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
            rules={{ required: true, minLength: 8 }}
            render={({ field }) =>
            <FormControl  {...field}  sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                inputProps={{ minLength: 8 }}
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
        {logResult.succes === null ? <></> :
        logResult.succes ? <Alert severity="error">Oups un problème est survenue !</Alert>
         : <Alert severity="success">Bienvenue chez RetroGamers !</Alert>}
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Annuler</Button>
          <Button type="submit">S'inscrire</Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
  );
}
