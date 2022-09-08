import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';

import styles from '../../styles/Console.module.css'


export default function SelectMainConsole({
  listInfo
}) {
  const [open, toggleOpen] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [notation, setNotation] = React.useState('2.5');
  const [notNotation, setNotNotation] = React.useState(false);

  const handleClose = () => {
   toggleOpen(false);
   setNotation('2.5');
   setNotNotation(false)
   setResult([]);
  };

  const calculNote = (resultat) => {
    console.log(resultat);
    if (resultat.rating !== 'Donnée non disponible') {
      const calcul = resultat.rating / 4
      setNotation(calcul)
    } else {
      setNotNotation(true)
    }
  }

  return (
    <div>
     <Autocomplete
     selectOnFocus
     handleHomeEndKeys
     disableClearable
        id="search-console"
        options={listInfo?.map((option) => option.title)}
        onChange={(event, value) => {
          const resultat = listInfo.find( game => game.title === value);
          setResult(resultat)
          toggleOpen(true)
          calculNote(resultat)
        } }
        sx={{ width: '100%', padding:'1rem', backgroundColor: '#ffffff' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Rechercher un jeu"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />

     <Dialog open={open} onClose={handleClose} >
     <Card 
  className={styles.modalcontainer}
  onClick={handleClose}
  >
      <CardActionArea>
        <div
            className={styles.modalcontainerfavorite}
        >
                  <CardMedia
                    className={styles.mediaconsole}
                    sx={{
                        width: '40%',
                        height: '40%',
                        padding: '0.5rem',
                        backgroundColor: '#fffff'
                    }}
                    component="img"
                    height="140"
                    src={result.media}
                    alt={`image du jeu ${result.title}`}
                  />
        </div>

        <CardContent
            className={styles.modaldesccontainer}>
          <Rating className={styles.modalstars} name="half-rating"
          value={notation}
          precision={0.1}
          readOnly/>
          <div className={styles.blackborder}></div> 
          { notNotation ?
          (`Note moyenne 10/20`)
          :
          (`Note moyenne ${result.rating}/20`)
          }
          <Typography className={styles.modaldetails} gutterBottom variant="h6" component="div">
            Détails du jeu
          </Typography>
          <Typography className={styles.modalsociety}>
            Le jeu a été développé par {result.developer} et vendu par {result.publisher}
          </Typography>
          <Typography>
            Il a été commercialisé en {result.release_date}
          </Typography>
          <Typography>
            Nombre de joueurs : {result.players}
          </Typography>
          <Typography>
            Jeu de type : {result.genre}
          </Typography>
          <Typography className={styles.modaldescription} gutterBottom variant="h6" component="div">
            Description
          </Typography>
          <Typography>
            {result.desc}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
      </Dialog>
</div>

  );
}
