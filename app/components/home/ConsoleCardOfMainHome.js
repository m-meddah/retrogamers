import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image'
import Link from "next/link";
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme, ThemeProvider } from '@mui/material/styles'


/* A function that returns a card with a console image, name, company, release date, end date, and a
button to add to favorites. */

export default function ConsoleCardOfMainHome({
    consoleInfo,
    userConnect,
    listConsolesFav
}) {

  const theme = createTheme({
    palette: {
        primary: {
            main: '#f73378',
            darker: '#053e85',
        },
        secondary: {
            main: '#f73378',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

  const [color, setColor] = React.useState('primary');
  const [titleBtn, setTitleBtn] = React.useState('Ajouter au favoris');
  const [iconBtn, setIconBtn] = React.useState(false);
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
        setColor('neutral')
        setTitleBtn('Retirer des favoris')
        setIconBtn(true)
      }}
     }

    const addFav = (userInfo, query) => {
      const dataFav = JSON.stringify(query)
      if (userInfo && dataFav) {
        fetch(`http://localhost:3080/api/collections/${userInfo.id}/systems`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: dataFav
        }).catch((err) => console.log(err))
  } }

    const subFav = (userInfo, query) => {
      const dataFav = JSON.stringify(query)
      if (userInfo && dataFav) {
        fetch(`http://localhost:3080/api/collections/${userInfo.id}/systems`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
          body: dataFav
        }).catch((err) => console.log(err))
  } }

    const fav = () => {
      if (color === 'primary') {
        addFav(userInfo, query);
        setColor('neutral')
        setTitleBtn('Retirer des favoris')
        setIconBtn(true)
      } else {
        subFav(userInfo, query);
        setColor('primary')
        setTitleBtn('Ajouter au favoris')
        setIconBtn(false)
      }
    }

  return (
    <Card sx={{
         width: '350px',
         height: '600px',
         marginBottom: '20px'
          }}>
      <CardHeader title={consoleInfo.name} subheader={consoleInfo.company} />
       <CardContent sx={{ paddingTop: '0' }}>
        <Typography variant="body2" color="text.secondary">
          De {consoleInfo.release_date} à {consoleInfo.end_date}
        </Typography>
       </CardContent>
        <CardMedia
          height="150"
          width="150"
        ><Image
        src={consoleInfo.media}
        alt={`photo de la ${consoleInfo.name}`}
        priority
        layout="responsive"
        width={100}
        height={100}
        key={console.id}
        /></CardMedia>
        <CardActions sx={{ justifyContent: 'center' }} >
        <Link key={consoleInfo.id} value={consoleInfo.id} href={'/console/' + consoleInfo.id}>
          <a>
          <Fab variant="extended" color="primary" aria-label="LearnMore">
          En savoir plus
          </Fab>
          </a>
        </Link>
        </CardActions>
        <ThemeProvider theme={theme}>
        {userConnect ? (
        <CardActions sx={{ justifyContent: 'center' }} >
          <Button onClick={fav}
           variant="contained"
           sx={{ borderRadius: '20px' }}
           color={color}
          startIcon={iconBtn ? (<RemoveIcon sx={{ mr: 1 }}/>) : (<FavoriteIcon sx={{ mr: 1 }}/>)}
          >
          {titleBtn}
          </Button>
          
        </CardActions>
        ) : ( <></> )}
        </ThemeProvider>
    </Card>
  );

}
