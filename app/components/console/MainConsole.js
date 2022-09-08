import React from 'react';
import styles from '../../styles/Console.module.css'
import ConsoleCardOfMainConsole from './ConsoleCardOfMainConsole'
import GamesCardOfMainConsole from './GamesCardOfMainConsole'
import SelectMainConsole from './SelectMainConsole';
import Box from '@mui/material/Box';


export default function MainConsole({
  console,
  games,
  listInfo,
  listConsolesFav,
  listGamesFav,
  userConnect
}) {

  return (
    <>
      <main className={styles.main}>

        <div className={styles.pagecontainer}>


          {/*------------------- Console Card */}

          <ConsoleCardOfMainConsole
            consoleInfo={console}
            listConsolesFav={listConsolesFav}
            userConnect={userConnect}
          />

          {/*------------------- Select Autocomplete */}
          <div className={styles.selectconsole}>
              <SelectMainConsole
                consoleInfo={console}
                games={games}
                listInfo={listInfo}
              />
          </div>

          {/*------------------- Game Card */}

          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              width: '100%',
              height: '90vh',
              overflow: "hidden",
              overflowY: "scroll",
            }}>


          <div>
              {listInfo?.map(game => (
                <GamesCardOfMainConsole
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  desc={game.desc}
                  publisher={game.publisher}
                  developer={game.developer}
                  players={game.players}
                  rating={game.rating}
                  description={game.desc}
                  genre={game.genre}
                  media={game.media}
                  release_date={game.release_date}
                  userConnect={userConnect}
                  consoleInfo={console}
                  listGamesFav={listGamesFav}
                />
              ))}
          </div>
          </Box>
        </div>


      </main>
    </>


  )
}
