'use client'

import Game from "../ui/Game";
import VersusBlock from "../ui/VersusBlock";
import Scorebar from "../ui/scorebar";
import { useState } from "react";

export default function CLASSIC() {
    const [score, setScore] = useState(0);
    const [versus, changeVersus] = useState(0);

    return(
        <div className="game-container h-screen w-full overflow-hidden">
            <Game gameMode="points" score={score} setScore={setScore} setVersus={changeVersus} />
            <Scorebar score={score} />
            <VersusBlock versusState={versus} />
        </div>
    );
}

/* --- TODO: ---

    - Add scorebar                      |   1/2
    - Add animated correct/incorrect    |   X
    - Setup and connect real player db  |   X
    - Add cookies/saving scores         |   X
    - Quality control EVERYTHING        |   X
*/