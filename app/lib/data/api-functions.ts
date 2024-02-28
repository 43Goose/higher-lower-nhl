import { PlayerInterface } from "./definitions";

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

export async function updatePlayer(id: string, newImage?: string): Promise<any> {
    try {
        const player = await getPlayerFromAPI(id);
        let bodyObject;
        if(newImage) {
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

export async function updateAllPlayers() {
    let updateCount = 0;
    try {
        const players = await fetch('/api/all-players').then(res => res.json());
        players.forEach(async (p: { nhlID: string; points: number; goals: number; assists: number; }) => {
            const curStats = await getPlayerFromAPI(p.nhlID);
            if(p.points != curStats.points || p.goals != curStats.goals || p.assists != curStats.assists) {
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

export async function checkExists(id: string): Promise<boolean> {
    try {
        const res = await fetch(`/api/player/${id}`).then(res => res.json());
        return res.length > 0;
    } catch(e) {
        return false;
    }
}

export async function getPlayerFromAPI(id: string): Promise<PlayerInterface> {
    const data = await fetch(`/api/nhl/${id}/landing`).then(res => {
        if(!res.ok) throw new Error('Could not complete API request!');
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

export async function getHeadShot(id: string) : Promise<string> {
    const data = await fetch(`${process.env.URL}api/nhl/${id}/landing`).then(res => {
        if(!res.ok) throw new Error('Could not complete API request!');
        return res.json();
    });
    return data.headshot;
}