import React from 'react';
import styles from '../../styles/Profil.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import ModalCardOfMainProfil from '../profil/ModalCardOfMainProfil';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';

export default function CardsGamesMainProfil({
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
}) {
    const notation = Math.round(Math.floor(`${rating}` / 4))


    const router = useRouter()


    const [color, setColor] = React.useState('warning');
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
            setQuery({ game_id: id, collection_id: userData.id })
        }
  
      }, []);
  
      const subFav = (userInfo, query) => {
        const dataFav = JSON.stringify(query)
        if (userInfo && dataFav) {
            fetch(`http://localhost:3080/api/collections/${userInfo.id}/games`, {
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
        <Card className={styles.cardcontainerProfil} sx={{ maxWidth: 345 }}>
                <div>
                    <IconButton
                    onClick={fav}
                    color={color}
                    >
                    <DeleteIcon fontSize="large"/>
                    </IconButton>
                </div>

            <CardMedia

                sx={{
                    width: '50%',
                    height: '50%',
                    padding: '0.5rem',
                    backgroundColor: '#fffff'
                }}
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

                <ModalCardOfMainProfil
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
    )
}
