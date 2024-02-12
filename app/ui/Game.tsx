import PlayerCard from "./PlayerCard";
import { useState } from "react";
import { getPlayerById } from "../lib/data";
import { Player } from "../lib/player-data";
import { waitForSeconds } from "../lib/util";
import { GetHighScoreCookie, SetHighScoreCookie } from "../lib/cookies";
import { News_Cycle } from "next/font/google";

export default function Game(
    { 
        gameMode, 
        score, 
        setScore, 
        playerOrder,
        setVersus, 
        endGame,
        setHighScore
    }: { 
        gameMode: 'points' | 'goals' | 'assists', 
        score: number, 
        setScore: Function, 
        playerOrder: Array<number>,
        setVersus: Function, 
        endGame: Function,
        setHighScore?: Function
    }) {
    const [comparable, setComparable] = useState<Player>(getPlayerById(playerOrder[0]));
    const [compared, setCompared] = useState<Player>(getPlayerById(playerOrder[1]));
    const [nextup, setNextUp] = useState<Player>(getPlayerById(playerOrder[2]));
    const [clicked, setClicked] = useState(false);
    const [slide, setSlide] = useState(false);
    const [disableBtns, setDisableBtns] = useState(false);

    const compare = async (input: boolean) => {
        const ans = compared[gameMode] >= comparable[gameMode];

        /* switches buttons to the stat count and waits */
        setClicked(true);
        await waitForSeconds(1000);

        /* checks user input and updates game accordingly */
        if(input === ans) {
            correctInput();
        } else {
            wrongInput();
        }
    };

    const correctInput = async () => {
        setDisableBtns(true);

        const newScore = score + 1;
        const hs = await GetHighScoreCookie();
        setScore(newScore);
        if(setHighScore != undefined && newScore > hs) {
            setHighScore(newScore);
            await SetHighScoreCookie(newScore);
        }
        
        setVersus(1);
        setSlide(true);

        await waitForSeconds(1200);

        /* sets playercards to new data */
        setComparable(compared);
        setCompared(nextup);
        setNextUp(getPlayerById(playerOrder[2+newScore]));

        /* sets playercards back to original positions and setups */
        setSlide(false);
        setClicked(false);
        setVersus(0);
        setDisableBtns(false);
    };

    const wrongInput = async () => {
        setVersus(2);
        await waitForSeconds(1200);
        setVersus(0);
        setClicked(false);
        setDisableBtns(true);
        endGame(true);
    };

    return (
        <div className={`md:h-full md:w-[150%] h-[150%] w-full flex md:flex-row flex-col`}>
            <PlayerCard 
                title={comparable.name} 
                stat={comparable[gameMode]} 
                playerImage={comparable.playerImage} 
                type="comparable" 
                slide={slide} 
                gameMode={gameMode} 
                isMain={true}/>
            <PlayerCard
                title={compared.name} 
                stat={compared[gameMode]} 
                playerImage={compared.playerImage} 
                type={clicked ? 'comparable' : 'compared'} 
                slide={slide}
                compareFn={compare} 
                gameMode={gameMode} 
                otherPlayer={comparable.name}
                disableBtns={disableBtns}/>
            <PlayerCard 
                title={nextup.name} 
                stat={nextup[gameMode]} 
                playerImage={nextup.playerImage} 
                type="nextup" slide={slide} 
                otherPlayer={compared.name} 
                gameMode={gameMode}
                disableBtns={true}/>
        </div>
    );
}