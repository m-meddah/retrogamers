import React, {useState, useEffect} from 'react';
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
import Alert from '@mui/material/Alert';


export default function FormChangeUser({ user }) {

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
    }
  });


  const [logResult, setlogResult] = useState({
    succes: null,
  });



  const onSubmit = data => {
      const dataUser = JSON.stringify(data)

        if (dataUser) {
          console.log(data);
          console.log(dataUser);

            fetch(`http://localhost:3080/api/users/${user.id}`, {
            method: "PATCH",
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
            }
          })
          .catch((err) => console.log(err))
          setlogResult(false);
          }}

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Modifier mes informations
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Formulaire de modification d'information</DialogTitle>
        <DialogContent sx={{ overflow: 'hidden' }}>
        <Controller
            name="firstname"
            control={control}
            render={({ field }) =>
            <FormControl {...field}  sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-firstname">{user.firstname}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstname"
              type="text"
              label={user.firstname}
            />
            <FormHelperText>Renseigner votre prénom</FormHelperText>
            </FormControl>}
        />
        <Controller
            name="lastname"
            control={control}
            render={({ field }) =>
            <FormControl  {...field}  sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lastname">{user.lastname}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastname"
              type="text"
              label={user.lastname}
            />
            <FormHelperText>Renseigner votre nom</FormHelperText>
            </FormControl>}
        />
        <Controller
            name="email"
            control={control}
            render={({ field }) =>
            <FormControl  {...field}  sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">{user.email}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              endAdornment={
                <InputAdornment position="end">
                  <EmailIcon/>
                </InputAdornment>
              }
              label={user.email}
            />
            </FormControl>
            }
        />
        <div>
        {logResult.succes === null ? <></> :
        logResult.succes ? <Alert severity="error">This is an error alert — check it out!</Alert>
         : <Alert severity="success">This is a success alert — check it out!</Alert>}
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Modifier</Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
  );
}
