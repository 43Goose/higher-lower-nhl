import { PlayerInterface } from "./definitions";

/** Adds player with given ID to DB from NHL API
 * @param id    - NHL ID of player to add
 */
export async function addPlayer(id: string): Promise<any> {
    try {
        const player = await getPlayerFromAPI(id);
        await fetch('/api/player', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ nhlID: player.nhlID, name: player.name, points: player.points, goals: player.goals, assists: player.assists, playerImage: player.playerImage })
        });
        return player;
    } catch (error) {
        console.error(error);
    }
}

/** Updates player with given ID in DB with up to date NHL stats and optional image 
 * @param id    - NHL ID of player to update
 * @param {string} [newImage]   - Optional image to change current player image
*/
export async function updatePlayer(id: string, newImage?: string): Promise<any> {
    try {
        const player = await getPlayerFromAPI(id);
        let bodyObject;
        if (newImage) {
            bodyObject = { points: player.points, goals: player.goals, assists: player.assists, new_image: newImage };
        } else {
            bodyObject = { points: player.points, goals: player.goals, assists: player.assists };
        }
        await fetch(`/api/player/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bodyObject)
        });
        return player;
    } catch (error) {
        console.error(error);
    }
}

/** Updates all Players in DB with up to date stats from NHL API */
export async function updateAllPlayers() {
    let updateCount = 0;
    try {
        const players = await fetch('/api/all-players').then(res => res.json());
        players.forEach(async (p: { nhlID: string; points: number; goals: number; assists: number; }) => {
            const curStats = await getPlayerFromAPI(p.nhlID);
            if (p.points != curStats.points || p.goals != curStats.goals || p.assists != curStats.assists) {
                const bodyObject = { points: curStats.points, goals: curStats.goals, assists: curStats.assists };
                updateCount++;
                await fetch(`/api/player/${p.nhlID}/update`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(bodyObject)
                });
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
        const res = await fetch(`/api/player/${id}`).then(res => res.json());
        return res.length > 0;
    } catch (e) {
        return false;
    }
}

/** Gets a player with given ID from NHL API
 * @param id    - NHL ID of desired player
 * @returns {PlayerInterface}   - Player received from API
 */
export async function getPlayerFromAPI(id: string): Promise<PlayerInterface> {
    const apiPath = process.env.VERCEL_URL ? `https://api-web.nhle.com/v1/player/${id}/landing` : `${process.env.URL}/api/nhl/${id}/landing`;
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