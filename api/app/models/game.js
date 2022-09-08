require('dotenv').config();
const client = require('../config/db');
const fetch = require('node-fetch');
const dayjs = require('dayjs');
const sanitizer = require('sanitizer')

const baseURL = 'https://www.screenscraper.fr/api2/jeuInfos.php?';

/**
 * @typedef {object} Game
 * @property {number} id - Pk of the "game" table
 * @property {string} title - title of the game
 * @property {string} publisher - publisher of the game
 * @property {string} developer - developer of the game
 * @property {string} players - number of players of the game
 * @property {string} rating - rating of the game
 * @property {string} desc - description of the game
 * @property {string} release_date - release date of the game
 * @property {string} genre - genre of the game
 * @property {string} media - media of the game
 */

module.exports = {

    /**
     * Find one game in our DB or in external API
     * @param {number} gameId - Id of the selected game
     * @returns 
     */
    async findOne(gameId) {
        const result = await client.query('SELECT * FROM "desc" WHERE id = $1;', [gameId]);

        // If game not found in DB, call the API
        if (result.rowCount === 0) {
            const url = `${baseURL}devid=${process.env.DEV_ID}&devpassword=${process.env.DEV_PASSWORD}&output=json&gameid=${gameId}`;
            const response = await fetch(url);
            // If game not found in API
            if (response.status != 200) {
                return 'Game not found'
            }
            const preData = await response.json();
            const data = preData.response.jeu;

            // Tricky function to pass the undefined data
            function undefined() {
            }

            // Get the Id of the game
            const descId = Number(data.id);
           

            // Get the Id of the system
            const descSystem = Number(data.systeme.id);

            // Get the title of the game
            let descTitle = data.noms;

            if (!descTitle) {
                descTitle = 'Donnée non disponible'
            }
            
            let descTitleText = '';

            for (let i = 0; i < descTitle.length; i++){
                
                let region = descTitle[i].region;
            switch (region) {
                case 'fr':    
                  descTitleText = descTitle[i].text;
                  if(descTitleText){
                    break;
                  } continue;
                case 'eu':
                  descTitleText = descTitle[i].text;
                case 'ss':
                  descTitleText = descTitle[i].text;
                default:            
              } if(region === 'fr'){
                break;
              } continue; }

           

            // Get the publisher of the game
            let descPublisher = data.editeur;
            // If publisher unknown, send 'data not found'
            if (!descPublisher) {
                descPublisher = 'Donnée non disponible'
            } else {
                descPublisher = descPublisher.text
            }
      

            // Get the developer of the game
            let descDeveloper = data.developpeur;
            // If developer unknown, send 'data not found'
            if (!descDeveloper) {
                descDeveloper = 'Donnée non disponible'
            } else {
                descDeveloper = descDeveloper.text
            }
        

            // Get the number of players for the game
            let descPlayers = data.joueurs;
            // If number of players unknown, send 'data not found'
            if (!descPlayers) {
                descPlayers = 'Donnée non disponible'
            } else {
                descPlayers = descPlayers.text
            }
           

            // Get the rating of the game
            let descRating = data.note;
            // If rating unknown, send 'data not found'
            if (!descRating) {
                descRating = 'Donnée non disponible'
            } else {
                descRating = descRating.text
            }
          

            // Get the synopsis of the game
            let descDesc = data.synopsis;
            // If synopsis unknown, send 'data not found'
            if (!descDesc) {
                descDesc = 'Donnée non disponible';
            } else {
                // Search for the french synopsis
                if (descDesc = data.synopsis.find((desc) => desc.langue === 'fr')) {
                }
                else {
                    // Else, take english
                    descDesc = data.synopsis.find((desc) => desc.langue === 'en')
                }  
                // Sanitize the text of the description
                descDesc = sanitizer.sanitize(descDesc.text);
            }
           
            
            // Get the release date of the game
            let descRelease = data.dates;
            // If release date unknown, send 'data not found'
            if (!descRelease) {
                descRelease = 'Donnée non disponible'
            } else {
                if (descRelease.length = 1) {
                    descRelease = descRelease[0];
                }
                if (descRelease == undefined) {
                    descRelease = data.dates.find((date) => date.region === 'fr');
                }
                if (descRelease == undefined) {
                    descRelease = data.dates.find((date) => date.region ==='eu');
                }
                if (descRelease == undefined) {
                    descRelease = data.dates.find((date) => date.region ==='us');
                }
                if (descRelease == undefined) {
                    descRelease = data.dates.find((date) => date.region ==='jp');
                }
                if (descRelease == undefined) {
                    descRelease = data.dates.find((date) => date.region ==='wor');
                }
                if (descRelease == undefined) {
                    descRelease = data.dates.find((date) => date.region ==='ru');
                }
                if (descRelease == undefined) {
                    descRelease = data.dates.find((date) => date.region ==='ss');
                }
                descRelease = descRelease.text;
                if (descRelease.length > 4) {
                    descRelease = dayjs(descRelease).format('DD/MM/YYYY')
                } else {
                    descRelease = '01/01/' + descRelease
                }
            }
           

            // Get the genre of the game
            let descGenre = data.genres;
            // If genre unknown, send 'data not found'
            if (!descGenre) {
                descGenre = 'Donnée non disponible'
            } else {
                // If only one genre
                if (descGenre.length <= 1) {
                    descGenre = descGenre[0].noms.find((nom)=> nom.langue === 'fr').text
                }
                else {
                    descGenre = data.genres.map((genre) => genre.noms.find((nom) => nom.langue === 'fr').text).toString();
                }
            }
            descGenre;
           

            // Get the image of the game
            const mediaUrl = `https://www.screenscraper.fr/medias/${descSystem}/${descId}/mixrbv2(wor).png`;
          

            // Get the video of the game
            const video = `https://www.screenscraper.fr/medias/${descSystem}/${descId}/video-normalized.mp4`;
          

            
            // Insert data into DB
            const addDescQuery = {
                text: `INSERT INTO "desc" ("id", "title","publisher","developer", "players", "rating", "desc", "release_date", "genre", "media") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
                values: [descId, descTitleText, descPublisher, descDeveloper, descPlayers, descRating, descDesc, descRelease, descGenre, mediaUrl]
            };

            await client.query(addDescQuery);

            const result = await client.query('SELECT * FROM "desc" WHERE id = $1;', [descId]);
            
            return result.rows[0];
            
        };

        return result.rows[0];
        
    }
};
