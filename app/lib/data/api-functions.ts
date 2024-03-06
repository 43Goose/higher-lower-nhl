import { PlayerInterface } from "./definitions";
const bcrypt = require('bcrypt');

/** Adds player with given ID to DB from NHL API
 * @param id    - NHL ID of player to add
 */
export async function addPlayer(id: string): Promise<any> {
    try {
        const player = await getPlayerFromNHL(id);
        const hashedKey = await bcrypt.hash(process.env.API_KEY, 10);
        const res = await fetch(`${process.env.API_URL}/player/add`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nhlID: player.nhlID,
                name: player.name,
                points: player.points,
                goals: player.goals,
                assists: player.assists,
                playerImage: player.playerImage,
                key: hashedKey
            })
        });
        return res;
    } catch (error) {
        console.error(error);
    }
}

/** Updates player with given ID in DB with up to date NHL stats and optional image 
 * @param id    - NHL ID of player to update
*/
export async function updatePlayer(id: string): Promise<any> {
    try {
        const curStats = await getPlayerFromNHL(id);
        const hashedKey = await bcrypt.hash(process.env.API_KEY, 10);
        const player = await fetch(`${process.env.API_URL}/player/update`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: curStats.nhlID,
                points: curStats.points,
                goals: curStats.goals,
                assists: curStats.assists,
                key: hashedKey
            })
        });
        return player;
    } catch (error) {
        console.error(error);
    }
}

/** Updates all Players in DB with up to date stats from NHL API */
export async function updateAllPlayers() {
    try {
        const players = await fetch(`${process.env.API_URL}/player/all-players`).then(res => res.json());
        players.forEach(async (p: { nhlID: string; points: number; goals: number; assists: number; }) => {
            const curStats = await getPlayerFromNHL(p.nhlID);
            if (p.points != curStats.points || p.goals != curStats.goals || p.assists != curStats.assists) {
                await updatePlayer(p.nhlID);
            }
        });
    } catch (error) {
        console.error(error);
    }

}

/** Checks if player exists in DB 
 * @param id    - ID of player to check
 * @returns {boolean}   - True if player exists in DB
*/
export async function checkExists(id: string): Promise<boolean> {
    try {
        const res = await fetch(`${process.env.API_URL}/player/${id}`).then(res => res.json());
        return res.length > 0;
    } catch (e) {
        return false;
    }
}

/** Gets player from NHL API via proxy
 * @param id    - NHL ID of player
 * @returns {PlayerInterface}   - Player type for easy use in functions
 */
const getPlayerFromNHL = async (id: string): Promise<PlayerInterface> => {
    // `/nhlapi/${id}/landing`;
    const apiPath = process.env.API_URL + `/player/${id}/nhl`;
    const data = await fetch(apiPath).then(res => {
        if (!res.ok) throw new Error('Could not complete API request!');
        return res.json();
    });

    const name = `${data.firstName.default} ${data.lastName.default}`;
    const points = data.featuredStats.regularSeason.career.points;
    const goals = data.featuredStats.regularSeason.career.goals;
    const assists = data.featuredStats.regularSeason.career.assists;
    const image = data.heroImage;
    const player = { nhlID: id, name: name, points: points, goals: goals, assists: assists, playerImage: image }

    return player;
}

/** Gets the headshot of player with given ID from NHL API
 * @param id    - NHL ID of player
 * @returns {string}    - URL of player headshot image
 */
export async function getHeadShot(id: string): Promise<string> {
    const apiPath = process.env.VERCEL_URL ? `https://api-web.nhle.com/v1/player/${id}/landing` : `${process.env.URL}/api/nhl/${id}/landing`;
    const data = await fetch(apiPath).then(res => {
        if (!res.ok) throw new Error('Could not complete API request!');
        return res.json();
    });
    return data.headshot;
}