import React from 'react'
import styles from '../../styles/Contact.module.css'
import FormContact from './FormContact'
import FormLogin from '../user/FormLogin'
import ImageAvatars from './AvatarMainContact'

export const MainContact = () => {
    return (
        <>
            <main className={styles.main}>
                <FormContact></FormContact>
                <FormLogin />
                <ImageAvatars></ImageAvatars>
            </main>

        </>
    )
}
