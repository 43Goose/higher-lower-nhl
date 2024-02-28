import PlayerCard from "./player-card";
import { useState } from "react";
import { PlayerInterface } from "../lib/data/definitions";
import { waitForSeconds } from "../lib/util";
import { GetHighScoreCookie, SetHighScoreCookie } from "../lib/cookies";

export default function Game(
    { 
        gameMode, 
        score, 
        setScore, 
        playerOrder,
        playerList,
        setVersus, 
        endGame,
        setHighScore
    }: { 
        gameMode: 'points' | 'goals' | 'assists', 
        score: number, 
        setScore: Function, 
        playerOrder: Array<number>,
        playerList: Array<PlayerInterface>,
        setVersus: Function, 
        endGame: Function,
        setHighScore?: Function
    }) {
    const [comparable, setComparable] = useState<PlayerInterface>(playerList[playerOrder[0]]);
    const [compared, setCompared] = useState<PlayerInterface>(playerList[playerOrder[1]]);
    const [nextup, setNextUp] = useState<PlayerInterface>(playerList[playerOrder[2]]);
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

        /* check to see if player has gone through all the players and win the game if so */
        if(2+newScore > playerOrder.length) { 
            endGame(1); 
            setVersus(0);
        } else {
            setSlide(true);
            await waitForSeconds(1200);

            /* sets playercards to new data */
            setComparable(compared);
            setCompared(nextup);
            setNextUp(playerList[playerOrder[2+newScore]]);

            /* sets playercards back to original positions and setups */
            setSlide(false);
            setClicked(false);
            setVersus(0);
            setDisableBtns(false);
        }
    };

    const wrongInput = async () => {
        setDisableBtns(true);
        setVersus(2);
        await waitForSeconds(1200);
        setVersus(0);
        endGame(2);
    };

    return (
        <div className={`md:h-full md:w-[150%] h-[150%] w-full flex md:flex-row flex-col ${slide ? 'md:-translate-x-1/3 md:translate-y-0 -translate-y-1/3 transition-transform duration-500' : 'md:translate-x-0 translate-y-0'}`}>
            <PlayerCard 
                title={comparable.name} 
                stat={comparable[gameMode]} 
                playerImage={comparable.playerImage} 
                type="comparable" 
                gameMode={gameMode} 
                isMain={true}/>
            <PlayerCard
                title={compared.name} 
                stat={compared[gameMode]} 
                playerImage={compared.playerImage} 
                type={clicked ? 'comparable' : 'compared'} 
                compareFn={compare} 
                gameMode={gameMode} 
                otherPlayer={comparable.name}
                disableBtns={disableBtns}/>
            <PlayerCard 
                title={nextup.name} 
                stat={nextup[gameMode]} 
                playerImage={nextup.playerImage} 
                type="nextup" 
                otherPlayer={compared.name} 
                gameMode={gameMode}
                disableBtns={true}/>
        </div>
    );
}