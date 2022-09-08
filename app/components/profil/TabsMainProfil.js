import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../../styles/Profil.module.css'

export default function BasicTabs() {

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '3rem' }}>
                <Tabs centered>
                    <Typography className={styles.typoProfil}
                     gutterBottom variant="overline" display="block"
                     sx={{ fontSize:'2rem', lineHeight:'1' }}
                     >
                    Mes consoles et jeux favoris
                    </Typography>
                </Tabs>
            </Box>
        </Box>
    );
}
