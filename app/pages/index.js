import React, { useState, useEffect } from 'react';
import MainHome from '../components/home/MainHome';



export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3080/api/systems');
  const data = await res.json();

  return {
    props: { consoles: data }
  }
}


export default function Home({ consoles, listConsolesFav, userConnect }) {

  return (
         <MainHome
         consoles={consoles}
         userConnect={userConnect}
         listConsolesFav={listConsolesFav}
         />
  )
}
