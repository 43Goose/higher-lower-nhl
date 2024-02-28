'use client'

import { useEffect, useState } from "react";
import Game from "./game-component";
import { fugaz } from "./fonts";
import VersusBlock from "./versus-block";
import Scorebar from "./scorebar";
import { GetHighScoreCookie, SetHighScoreCookie, checkHighScoreCookie } from "../lib/cookies";
import { PlayerInterface } from "../lib/data/definitions";
import { shuffle } from "../lib/data/data";
import { waitForSeconds } from "../lib/util";

export default function GameScreen(
    {
        gameMode, 
        originalOrder, 
        playerList,
        acceptedCookies 
    }: { 
        gameMode: 'points' | 'goals' | 'assists', 
        originalOrder: Array<number>,
        playerList: Array<PlayerInterface>,
        acceptedCookies: boolean 
    }) {
    const [gameOver, setGameOver] = useState(0);
    const [score, setScore] = useState(0);
    const [versus, changeVersus] = useState(0);
    const [render, setRender] = useState(true);
    const [highScore, setHighScore] = useState(0);
    const [playerOrder, setOrder] = useState(originalOrder);

    useEffect(() => {
        async function checkCookies() {
            const hasHighScore = await checkHighScoreCookie();
            if(hasHighScore) {
                setHighScore(await GetHighScoreCookie());
            } else if(!hasHighScore) {
                await SetHighScoreCookie(0);
            }
        }
        
        checkCookies();
    });

    const newOrder = (curOrder: Array<number>) => {
        return shuffle(curOrder);
    }

    function GameOverScreen() {        
        const resetGame = async () => {
            setScore(0);
            setGameOver(0);
            setRender(false);
            setOrder(newOrder(playerOrder));
            await waitForSeconds(10);
            setRender(true);
        }

        return(
            <div className={`h-screen w-full absolute top-0 flex flex-center ${gameOver != 0 ? 'animate-fadeIn' : 'hidden'}`}>
                <div className={`${fugaz.className} lg:h-1/3 h-auto md:w-1/2 w-3/4 lg:p-0 p-4 text-center max-w-3xl flex flex-col bg-slate-900 rounded-3xl flex-center text-xl shadow-lg shadow-black`}>
                    <p className={`text-5xl ${gameOver == 1 ? 'text-main' : 'text-sec'}`}>{gameOver == 1 ? 'YOU WIN!' : 'GAME OVER'}</p>
                    <p>{`Score: ${score}`}</p>
                    {acceptedCookies ? <p>{`Your High Score: ${highScore}`}</p> : null}
                    <button 
                        className={`group/button m-4 w-36 h-14 btn-primary rounded-full active:scale-95`}
                        onClick={resetGame}     
                    >PLAY AGAIN</button>
                </div>
            </div>
        );
    }

    return render ? (
        <>
            <div className="game-container h-screen w-full overflow-hidden">
                <Game gameMode={gameMode} score={score} setScore={setScore} playerOrder={playerOrder} playerList={playerList} setVersus={changeVersus} endGame={setGameOver} setHighScore={acceptedCookies ? setHighScore : undefined}/>
                <Scorebar score={score} highScore={acceptedCookies ? highScore : undefined} />
                <VersusBlock versusState={versus} />
            </div>
            <GameOverScreen />
        </>
    ) : null;
}