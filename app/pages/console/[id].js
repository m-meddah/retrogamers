import Box from '@mui/material/Box';
import React from 'react';
import MainConsole from '../../components/console/MainConsole';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3080/api/systems');
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.map(console => {
    return {
      params: { id: console.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}


export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('http://localhost:3080/api/systems/' + id);
  const data = await res.json();

  const resGames = await fetch(`http://localhost:3080/api/systems/${id}/games`);
  const dataGames = await resGames.json();


  const listInfo = []

  const dataNumber = Math.min(dataGames.length-1, 30);

    for(let i = 0; i <= dataNumber; i++) {
      const gameId = dataGames[i].id;
      const resGame = await fetch(`http://localhost:3080/api/games/${gameId}`);
      const game = await resGame.json();
      listInfo.push(game);
    }


  return {
    props: { console: data, games:dataGames, listInfo: listInfo }
  }
}

const Details = ({ console, games, listInfo, userConnect, listConsolesFav, listGamesFav }) => {
  return (
    <><Box>
      <MainConsole
      console={console}
      games={games}
      listInfo={listInfo}
      userConnect={userConnect}
      listConsolesFav={listConsolesFav}
      listGamesFav={listGamesFav}
      />
      </Box></>
  );
}

export default Details;
