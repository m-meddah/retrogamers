import React from 'react';
import styles from '../../styles/Console.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import ModalCardOfMainConsole from './ModalCardOfMainConsole'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';

export default function GamesCardOfMainConsole({
    id,
    title,
    publisher,
    developer,
    players,
    rating,
    description,
    genre,
    media,
    release_date,
    userConnect,
    listGamesFav

}) {

    const notation = Math.round(Math.floor(`${rating}` / 4))

    const theme = createTheme({
        palette: {
            primary: {
                main: '#0971f1',
                darker: '#053e85',
            },
            secondary: {
                main: '#f73378',
            },
            neutral: {
                main: '#64748B',
            },
        },
    });

    const [color, setColor] = React.useState('neutral');
    const [userInfo, setUser] = React.useState();
    const [query, setQuery] = React.useState({ game_id:"", collection_id:"" })

  /**
  * It's a function that allows you to add or remove a game from your favorites.
  * @param userInfo - the user's information
  * @param query - the id of the console and the id of the user
  */
 
   React.useEffect(() => {
    if (localStorage.user) {
        const userData = JSON.parse(localStorage.user);
        setUser(userData)
        setQuery({ game_id: id, collection_id: userData.id })
        verifFav()
    }

    }, [userConnect, listGamesFav]);

    const verifFav = () => {
      if (listGamesFav && title) {
      const resultat = listGamesFav.find( console => console.title === title);
      if (resultat) {
        setColor('secondary')
      }}
     }

    const addFav = (userInfo, query) => {
      if (userInfo && query) {
        fetch(`http://localhost:3080/api/collections/${userInfo.id}/games`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(query)
        }).catch((err) => console.log(err))
  } }


    const subFav = (userInfo, query) => {
      if (userInfo && query) {
        fetch(`http://localhost:3080/api/collections/${userInfo.id}/games`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(query)
        }).catch((err) => console.log(err))
  } }

    const fav = () => {
      if (color === 'neutral') {
        addFav(userInfo, query);
        setColor('secondary')
      } else {
        subFav(userInfo, query);
        setColor('neutral')
      }
    }

    return (

        <Card className={styles.cardcontainer} sx={{ maxWidth: 345 }}>
           <div>
            {userConnect ? (
            <ThemeProvider theme={theme}>
                <IconButton
                    onClick={fav}
                    color={color}
                    >
                    <FavoriteIcon fontSize="large"/>
                    </IconButton>
            </ThemeProvider>
            ) : ( <></> )}
            </div>
            <CardMedia
                className={styles.cardimage}
                component="img"
                height="140"
                src={media}
                alt="console"
            />

            <CardContent className={styles.cardcenter}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <div className={styles.blackborder}></div>
                <Rating name="half-rating" defaultValue={notation} precision={1} readOnly />
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>


                <ModalCardOfMainConsole
                    id={id}
                    title={title}
                    description={description}
                    publisher={publisher}
                    developer={developer}
                    players={players}
                    rating={rating}
                    genre={genre}
                    media={media}
                    notation={notation}
                    release_date={release_date}
                />

            </CardContent>

        </Card>

    );
}
