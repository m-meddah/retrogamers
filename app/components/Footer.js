import React from 'react'
import styles from '../styles/Footer.module.css'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Link from 'next/link'


export const Footer = () => {
    const [value, setValue] = React.useState(0);
    return(
        <footer>
            <Box className={styles.footer}>
            <BottomNavigation
                className={styles.icons}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            >
                
                {/* lien vers la page contact */}
                <Link href='/contact'><a className="contactcontainer">

                     <h3 className="contactteamfooter">Cliquez-ci pour nous contacter !</h3>
                    
                </a>
                </Link>
            </BottomNavigation>
            <h3 className={styles.copyright}>Reste connecté avec nous ! </h3>
            <BottomNavigation className={styles.socialsicons}>
                <BottomNavigationAction className={styles.iconssocialtwitter} label="Twitter" icon={<TwitterIcon />} />
                <BottomNavigationAction className={styles.iconssocialfb} label="Facebook" icon={<FacebookIcon />} />
                <BottomNavigationAction className={styles.iconssocialyoutube} label="YouTube" icon={<YouTubeIcon />} />
                <BottomNavigationAction className={styles.iconssociallinkedin} label="Linkedin" icon={<LinkedInIcon />} />

            </BottomNavigation>
                 <Link href='/console/koala'>
                    <a>
                    <h5 className={styles.copyright}>Copyright 2022</h5>
                    </a>
                </Link>
                <h6 className={styles.copyright}>Thank you to www.screenscraper.fr</h6>
            </Box>
        </footer>
    )
}
