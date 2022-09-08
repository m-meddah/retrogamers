import React from 'react'
import styles from '../../styles/Home.module.css'
import SelectOfMainHome from './SelectOfMainHome'
import ConsoleCardOfMainHome from './ConsoleCardOfMainHome'
import Box from '@mui/material/Box';

export default function MainHome ({ consoles, userConnect, listConsolesFav }){

    return(
        <>
         <main className={styles.main}>
         <Box
            sx={{
              width: '100%',
              height: '100vh',
              padding: '0.5rem',
              backgroundColor: '#fffff',
              overflow: "hidden",
              overflowY: "hidden",
            }}
          >
            
            <SelectOfMainHome consoles={consoles} />
            <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              width: '100%',
              height: '90vh',
              overflow: "hidden",
              overflowY: "scroll",
            }}

            className={styles.block}>
                  {consoles.map(console => (
                      <ConsoleCardOfMainHome
                      key={console.id}
                      consoleInfo={console}
                      userConnect={userConnect}
                      listConsolesFav={listConsolesFav}
                      />
                  ))}
            </Box>
          </Box>

         </main>
        </>
    )
}
