import { Players } from "./player-data";
import { Player } from "./player-data";

export default function getPlayerById(id:number = 1) : Player {
    const p = <Player>Players.find(x => x.id == id);
    return p ? p : Players[0];
}