import { PlayerInterface } from "./definitions";

/** Generates the order players will be grabbed from DB to eliminate possible duplicate players
 * @returns {Array<number>} - Randomized order of numbers in a range from 0 to number of players in DB
 */
export async function generateOrder(): Promise<Array<number>> {
    const players = await fetch(process.env.URL + 'api/all-players').then(res => res.json());
    let orderArr = Array.from({ length: players.length }, (val, i) => i);

    return shuffle(orderArr);
}

/** Gets list of all players from API and converts into PlayerInterface type
 * @returns {Array<PlayerInterface>}    - Ordered list of players for use in game
 */
export async function getPlayerList(): Promise<Array<PlayerInterface>> {
    const rawPlayers = await fetch(process.env.URL + 'api/all-players').then(res => res.json());
    const playerList = rawPlayers.map((p: { nhlID: string; name: string; points: number; goals: number; assists: number; playerImage: string; }) => {
        const { nhlID, name, points, goals, assists, playerImage } = p;
        return { nhlID: nhlID, name: name, points: points, goals: goals, assists: assists, playerImage: playerImage };
    })
    return playerList;
}

/** Shuffles given array using Fisher-Yates algorithm 
 * @returns {Array<number>} - New shuffled array of given array of numbers
*/
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