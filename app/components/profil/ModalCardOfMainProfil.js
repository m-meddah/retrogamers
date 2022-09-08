import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';

import styles from '../../styles/Console.module.css'

export default function ModalCardOfMainConsole({
  title,
  publisher,
  developer,
  players,
  rating,
  description,
  genre,
  media,
  release_date,
  notation

}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
  <div>
  <Button variant="outlined" onClick={handleClickOpen}>
    En savoir plus
  </Button>
  <Dialog open={open} onClose={handleClose}>
  
  <Card 
  className={styles.modalcontainer}
  onClick={handleClose}
  >
      <CardActionArea>
        <div
            className={styles.modalcontainerfavorite}>
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
                    src={media}
                    alt={`image du jeu ${title}`}
                />
        </div>
        <CardContent
            className={styles.modaldesccontainer}>
          <Rating className={styles.modalstars} name="half-rating" defaultValue={notation} precision={1.0}/>
          <div className={styles.blackborder}></div>
          Note moyenne {rating}/20
          <Typography className={styles.modaldetails} gutterBottom variant="h6" component="div">
            Détails du jeu
          </Typography>
          <Typography className={styles.modalsociety}>
            Le jeu a été développé par {developer} et vendu par {publisher}
          </Typography>
          <Typography>
            Il a été commercialisé le {release_date}
          </Typography>
          <Typography>
            Nombre de joueurs : {players}
          </Typography>
          <Typography>
            Jeu de type : {genre}
          </Typography>
          <Typography className={styles.modaldescription} gutterBottom variant="h6" component="div">
            Description
          </Typography>
          <Typography>
            {description}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  
</Dialog>
</div>

);
}
