import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import styles from '../../styles/Contact.module.css'


export default function FormContact() {
  const [open, setOpen] = React.useState(false);
 

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });



  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const [query, setQuery] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message:""
  });

const formSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  Object.entries(query).forEach(([key, value]) => {
    formData.append(key, value);
  });

  fetch("http://localhost:3080/api/contact", {
    method: "POST",
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: formData
  }).then(() => setQuery({ firstname: "", lastname:"", email: "", message:""}))
  .catch((err) => console.log(err))
};

  return (
      <Box 
      className={styles.formcontainer}
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
      <Paper  elevation={3} sx={{ padding: '20px' }}>
        <h1>Nous contacter</h1>
        <form onSubmit={formSubmit}>
        <DialogContentText>
          Merci de remplir tous les champs du formulaire de contact.
        </DialogContentText>
          <div>
            <Input
              type="text"
              name="firstname"
              required
              placeholder="Prénom"
              className="form-control"
              value={query.firstname}
              onChange={handleParam()}
            />
          </div>
          <div>
            <Input
              type="text"
              name="lastname"
              required
              placeholder="Nom"
              className="form-control"
              value={query.lastname}
              onChange={handleParam()}
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="form-control"
              value={query.email}
              onChange={handleParam()}
              
            />
          </div>
          <div>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Votre message"
            style={{ width: '100%', height: 200 , marginTop: 10}}
            name="message"
            required
            className="form-control"
            value={query.message}
            onChange={handleParam()}
          />
          </div>

          <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleClose} type="submit">Envoyez votre demande</Button>
          </DialogActions>
        </form>
      
      </Paper>
      </Box>
   
  );
}
