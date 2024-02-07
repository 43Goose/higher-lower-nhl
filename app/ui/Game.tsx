import PlayerCard from "./PlayerCard";
import { useState } from "react";
import getPlayerById from "../lib/data";
import { Player } from "../lib/player-data";
import { waitForSeconds } from "../lib/util";
import { GetHighScoreCookie, SetHighScoreCookie } from "../lib/cookies";

export default function Game(
    { 
        gameMode, 
        score, 
        setScore, 
        setVersus, 
        endGame,
        setHighScore
    }: { 
        gameMode: 'points' | 'goals' | 'assists', 
        score: number, 
        setScore: Function, 
        setVersus: Function, 
        endGame: Function,
        setHighScore?: Function
    }) {
    const [comparable, setComparable] = useState<Player>(getPlayerById(1));
    const [compared, setCompared] = useState<Player>(getPlayerById(2));
    const [nextup, setNextUp] = useState<Player>(getPlayerById(3));
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
        setNextUp(getPlayerById(nextup ? nextup.id + 1 : 1));

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
        <div className={`h-full w-[150%] flex flex-row`}>
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