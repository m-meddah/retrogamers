import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Link from "next/link";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles'


/* A function that returns a card with a console image, name, company, release date, end date, and a
button to add to favorites. */

export default function ConsoleCardOfMainHome({ console }) {

  const router = useRouter()

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

  const [color, setColor] = React.useState('warning');
  const [titleBtn, setTitleBtn] = React.useState('Supprimer des favoris');
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
        setQuery({ system_id: console.id, collection_id: userData.id })
    }

    }, []);

    const subFav = (userInfo, query) => {
      const dataFav = JSON.stringify(query)
      if (userInfo && dataFav) {
        fetch(`http://localhost:3080/api/collections/${userInfo.id}/systems`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
          body: dataFav
        }).then(() => router.reload(window.location.pathname))
        .catch((err) => console.log(err))
  } }

    const fav = () => {
        subFav(userInfo, query);
      }

  return (
    <Card sx={{
         width: '350px',
         height: '600px',
         marginBottom: '20px'
          }}>
      <CardHeader title={console.name} subheader={console.company} />
       <CardContent sx={{ paddingTop: '0' }}>
        <Typography variant="body2" color="text.secondary">
          De {console.release_date} à {console.end_date}
        </Typography>
       </CardContent>
        <CardMedia
          height="150"
          width="150"
        ><Image
        src={console.media}
        alt={`photo de la ${console.name}`}
        priority
        layout="responsive"
        width={100}
        height={100}
        key={console.id}
        /></CardMedia>
        <CardActions sx={{ justifyContent: 'center' }} >
        <Link key={console.id} value={console.id} href={'/console/' + console.id}>
          <a key={console.id}> 
          <Fab key={console.id} variant="extended" color="primary" aria-label="LearnMore">
          En savoir plus
          </Fab>
          </a>
        </Link>
        </CardActions>
        <ThemeProvider theme={theme}>
        <CardActions sx={{ justifyContent: 'center' }} >
          <Button onClick={fav}
           variant="contained"
           sx={{ borderRadius: '20px' }}
           color={color}
          startIcon={(<DeleteIcon sx={{ mr: 1 }}/>)}
          >
          {titleBtn}
          </Button>
        </CardActions>
        </ThemeProvider>
    </Card>
  );

}
