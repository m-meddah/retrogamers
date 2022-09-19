import React from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image'
import chicken from '../../public/images/chicken.gif'
import styles from '../../styles/Contact.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AvatarMainContact() {
    return (

        // Don't forget to make a loop later on, in order to optimise the code
        <div className={styles.containerAvatar}>
            <Card sx={{ maxWidth: 335 }} >
                <CardActionArea >
                    <CardContent className={styles.Avatar}>
                        <Avatar alt="JC" sx={{ width: 80, height: 80 }}>
                            <Image
                                src={chicken}
                                alt="JC"
                            />
                        </Avatar>
                        <Typography gutterBottom variant="h5" component="div">
                            JC
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Project Manager
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 335 }}>
                <CardActionArea>
                    <CardContent className={styles.Avatar}>
                        <Avatar alt="Allan" sx={{ width: 80, height: 80 }}>
                            <Image
                                src={chicken}
                                alt="Allan"
                            />
                        </Avatar>
                        <Typography gutterBottom variant="h5" component="div">
                            Allan
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lead dev front
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 335 }}>
                <CardActionArea>
                    <CardContent className={styles.Avatar}>
                        <Avatar alt="Alex" sx={{ width: 80, height: 80 }}>
                            <Image
                                src={chicken}
                                alt="Alex"
                            />
                        </Avatar>
                        <Typography gutterBottom variant="h5" component="div">
                            Alex
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Git Master
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 335 }}>
                <CardActionArea>
                    <CardContent className={styles.Avatar}>
                        <Avatar alt="Madjid" sx={{ width: 80, height: 80 }}>
                            <Image

                                src={chicken}
                                alt="Madjid"
                            />
                        </Avatar>
                        <Typography gutterBottom variant="h5" component="div">
                            Madjid
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Product Owner
                            Lead dev back
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
        </div >
    );
}
