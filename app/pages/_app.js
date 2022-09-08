import * as React from 'react';
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import '../styles/globals.css'


export default function MyApp({ Component, pageProps }) {

  const router = useRouter()

  const [userConnect, setuserConnect] = React.useState(false);
  const [userId, setUserId] = React.useState(1);
  const [logResult, setlogResult] = React.useState(true);
  const [listConsolesFav, setListConsolesFav] = React.useState();
  const [listGamesFav, setListGamesFav] = React.useState();

  React.useEffect(() => {
    if (localStorage.user) {
      setuserConnect(true)
      addFavorites()
    }
  },[])

  const addFavorites = async () => {

    const resConsoles = await fetch(`http://localhost:3080/api/collections/${userId}/systems`);
    const userListConsoles = await resConsoles.json();

    const resGames = await fetch(`http://localhost:3080/api/collections/${userId}/games`);
    const userListGames = await resGames.json();

    setListConsolesFav(userListConsoles);
    setListGamesFav(userListGames);

  };

  const onSubmit = async data => {
    const logUser = JSON.stringify(data)

       const res = await fetch("http://localhost:3080/api/users/login", {
          method: "POST",
          headers: {
          'Content-Type': 'application/json',
          },
          body: logUser,
       })
      const userData = await res.json()

        if (res.ok){
          console.log('Tu es connecté')
          console.log(userData)
          setUserId(userData.id)
          setuserConnect(true)
          localStorage.setItem('user', JSON.stringify(userData))
          router.reload(window.location.pathname)
        }
        if (!res.ok){
          console.log('refuser')
         setlogResult(false)
        }
      }


  return (
    <Layout onSubmit={onSubmit} logResult={logResult} userConnect={userConnect} >
      <Component {...pageProps }
      userConnect={userConnect}
      listConsolesFav={listConsolesFav}
      listGamesFav={listGamesFav}
      />
    </Layout>
  )
}
