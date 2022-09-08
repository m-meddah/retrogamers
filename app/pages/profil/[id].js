import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
import * as React from 'react';
import MainProfil from '../../components/profil/MainProfil';

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3080/api/users');
    const data = await res.json();


    // map data to an array of path objects with params (id)
    const paths = data.map(user => {
        return {
            params: { id: user.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:3080/api/users/' + id);
    const data = await res.json();

    const resCollSystem = await fetch(`http://localhost:3080/api/collections/${id}/systems`);
    const dataCollSystem = await resCollSystem.json();

    const resCollGames = await fetch(`http://localhost:3080/api/collections/${id}/games`);
    const dataCollGames = await resCollGames.json();

    return {
        props: { user: data, consolesInfo: dataCollSystem, gamesInfo: dataCollGames }
    }
}

const Details = ({ user, consolesInfo, gamesInfo }) => {

    return (
        <><Box>
            <MainProfil
                user={user}
                gamesInfo={gamesInfo}
                consolesInfo={consolesInfo}
            />
        </Box></>
    );
}

export default Details;
