import { Players } from "./player-data";
import { Player } from "./player-data";

export function getPlayerById(id:number = 1) : Player {
    const p = <Player>Players.find(x => x.id == id);
    return p ? p : Players[0];
}

export function generateOrder() : Array<number> {
    let orderArr = Array.from({length: Players.length}, (val, i) => i+1);
    
    return shuffle(orderArr);
}

function shuffle(array: Array<number>) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }

    return newArray;
}