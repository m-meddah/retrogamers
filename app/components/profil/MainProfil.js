import React from 'react';
import styles from '../../styles/Profil.module.css'
import AvatarMainProfil from './AvatarMainProfil';
import CardsGamesMainProfil from './CardsGamesMainProfil';
import SelectMainProfil from './SelectMainProfil';
import TabsMainProfil from './TabsMainProfil';
import ConsoleCardMainProfil from './ConsoleCardMainProfil';
import { useRouter } from 'next/router'

export default function MainProfil({
    user,
    addFavorites,
    gamesInfo,
    consolesInfo
}) {

    const router = useRouter();

    React.useEffect(() => {
        if (!localStorage.user) {
            router.push('/', null, { shallow: false });
        }
        }, [user]);
      

    return (
        <>
            <main className={styles.main}>
                <div className={styles.pagecontainer}>
                    {/*------------------- Avatar Profil Card*/}
                        <AvatarMainProfil  user={user}/>

                                <TabsMainProfil />

                    {/*------------------- Console Card */}

                    <div className={styles.consolesBlock}>
                    {consolesInfo?.map(console => (
                            <ConsoleCardMainProfil console={console}  addFavorites={addFavorites} />))}
                    </div>

                    {/*------------------- Select Autocomplete */}

                     <SelectMainProfil listInfo={gamesInfo} />

                    {/*------------------- Game Card */}
                    <div>
                           {gamesInfo?.map(game => (
                                <CardsGamesMainProfil
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
                                    addFavorites={addFavorites}
                                />
                            ))}
                    </div>
                </div>
            </main>
        </>
    )
}
