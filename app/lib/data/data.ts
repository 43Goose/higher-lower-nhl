import { PlayerInterface } from "./definitions";

export async function getNextPlayer(id: string) : Promise<PlayerInterface> {
    const data = await fetch(process.env.URL+`api/player/${id}`).then(res => res.json());
    const { nhlID, name, points, goals, assists, playerImage } = data[0];
    const p = { nhlID: nhlID, name: name, points: points, goals: goals, assists: assists, playerImage: playerImage };
    return p;
}

export async function generateOrder() : Promise<Array<number>> {
    const players = await fetch(process.env.URL+'api/all-players').then(res => res.json());
    let orderArr = Array.from({length: players.length}, (val, i) => i);
    
    return shuffle(orderArr);
}

export async function getPlayerList(): Promise<Array<PlayerInterface>> {
    const rawPlayers = await fetch(process.env.URL+'api/all-players').then(res => res.json());
    const playerList = rawPlayers.map((p: { nhlID: string; name: string; points: number; goals: number; assists: number; playerImage: string; }) => {
        const { nhlID, name, points, goals, assists, playerImage } = p;
        return { nhlID: nhlID, name: name, points: points, goals: goals, assists: assists, playerImage: playerImage };
    })
    return playerList;
}

export function shuffle(array: Array<number>) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }

    return newArray;
}