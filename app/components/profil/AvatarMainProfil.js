import React from 'react';
import styles from '../../styles/Profil.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FormChangeUser from '../user/FormChangeUser';

export default function AvatarMainProfil({ user }) {

    return (

        <Card className={styles.cardcontainer} sx={{ maxWidth: 345 }}>

            <CardMedia
                className={styles.cardimage}
                component="img"
                height="140"
                src="https://i.pinimg.com/originals/cd/14/05/cd14050fc3fef585722341acde76cc5c.gif"
                alt="console"
            />

            <CardContent className={styles.cardcenter}>
                <Typography gutterBottom variant="h5" component="div">
                    {user.firstname} {user.lastname}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {user.email}
                </Typography>

                <div className={styles.blackborder}></div>

                <FormChangeUser user={user} />
            </CardContent>

        </Card>

    );
}
