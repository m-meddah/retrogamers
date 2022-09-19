import React from 'react';
import styles from '../../styles/Console.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export default function ConsoleCardOfMainConsole({
    consoleInfo,
    userConnect,
    listConsolesFav

}) {

    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
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
    const [query, setQuery] = React.useState({ system_id:"", collection_id:"" });

    /**
  * It's a function that allows you to add or remove a game from your favorites.
  * @param userInfo - the user's information
  * @param query - the id of the console and the id of the user
  */

  React.useEffect(() => {
    if (localStorage.user) {
        const userData = JSON.parse(localStorage.user);
        setUser(userData)
        setQuery({ system_id: consoleInfo.id, collection_id: userData.id })
        verifFav()
    }

    }, [userConnect, listConsolesFav]);

    const verifFav = () => {
      if (listConsolesFav && consoleInfo) {
      const resultat = listConsolesFav.find( console => console.name === consoleInfo.name);
      if (resultat) {
        setColor('secondary')
      }}
     }


    const addFav = (userInfo, query) => {
      if (userInfo && query) {
        fetch(`http://localhost:3080/api/collections/${userInfo.id}/systems`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(query)
        }).catch((err) => console.log(err))
  } }

    const subFav = (userInfo, query) => {
      if (userInfo && query) {
        fetch(`http://localhost:3080/api/collections/${userInfo.id}/systems`, {
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

        <div>
            <Card className={styles.consolecontainer} sx={{ maxWidth: 3000 }}>
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
                    className={styles.mediaconsole}
                    sx={{
                        width: '40%',
                        height: '40%',
                        padding: '0.5rem',
                        backgroundColor: '#fffff'
                    }}
                    component="img"
                    height="140"
                    src={consoleInfo.big_media}
                    alt="console"
                />

                <CardContent
                    className={styles.cardconsolecontainer}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {consoleInfo.name}

                    </Typography>

                    <Typography className={styles.cardcontentresponsive} variant="body2" color="text.secondary">
                        De {consoleInfo.release_date} à {consoleInfo.end_date}

                    </Typography>
                </CardContent>

            </Card>
        </div>


    );
}
