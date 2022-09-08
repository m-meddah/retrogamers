import React from 'react'
import styles from '../styles/Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import BarMenu from './nav/BarMenu.js'
import FormLogin from './user/FormLogin';
import FormSignIn from './user/FormSignIn';
import logo from '../public/images/Logo_RetroGaming.png'


export const Header = ({  onSubmit, logResult, userConnect }) => {

    const [showLogin, setShowLogin] = React.useState(false);
    const [showSignIn, setShowSignIn] = React.useState(false);
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignIn, setOpenSignIn] = React.useState(false);

    const changeShowLogin = () => {
        console.log('modal login open')
        setShowLogin(!showLogin);
        setOpenLogin(!openLogin);
      };


    const changeShowSignIn = () => {
        console.log('modal signin open')
        setShowSignIn(!showSignIn);
        setOpenSignIn(!openSignIn);
      };

    return(
        <header>
        <div className={styles.header}>
            <Link href='/'><a>
            <Image
            src={logo}
            alt="Logo RetroGamers"
            width={400}
            height={300}
            />
            </a></Link>
            <BarMenu showLogin={changeShowLogin} showSignIn={changeShowSignIn} userConnect={userConnect} ></BarMenu>
            {showLogin ? 
             <FormLogin
              open={openLogin} 
              close={changeShowLogin}
              onSubmit={onSubmit}
              logResult={logResult} /> : <></> }
            {showSignIn ? 
             <FormSignIn 
             open={openSignIn} 
             close={changeShowSignIn} /> : <></> }
        </div>
        </header>
    )
}
