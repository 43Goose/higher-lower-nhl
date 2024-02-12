'use client'

import { useEffect, useState } from "react";
import Game from "../ui/Game";
import { fugaz } from "../ui/fonts";
import VersusBlock from "../ui/VersusBlock";
import Scorebar from "../ui/scorebar";
import { waitForSeconds } from "../lib/util";
import { GetHighScoreCookie, SetHighScoreCookie, checkHighScoreCookie } from "../lib/cookies";

export default function GameScreen(
    {
        gameMode, 
        playerOrder, 
        acceptedCookies 
    }: { 
        gameMode: 'points' | 'goals' | 'assists', 
        playerOrder: Array<number>,
        acceptedCookies: boolean 
    }) {
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [versus, changeVersus] = useState(0);
    const [render, setRender] = useState(true);
    const [highScore, setHighScore] = useState(0);

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

    function GameOverScreen() {
        const resetGame = async () => {
            setScore(0);
            setGameOver(false);
            setRender(false);
            await waitForSeconds(100);
            setRender(true);
        }

        const bgText = 'bg-gradient-to-r from-cyan-600 from-50% to-white to-50% bg-[length:200%_100%] bg-clip-text bg-right group-hover/button:bg-left transition-[background] duration-500 ease-in-out'
        const bgButton = 'bg-gradient-to-r from-white from-50% to-zinc-800 to-50% bg-[length:201%_100%] bg-right hover:bg-left transition-[background] duration-500 ease-in-out';

        return(
            <div className={`h-screen w-full absolute top-0 flex justify-center items-center ${gameOver ? 'animate-fadeIn' : 'hidden'}`}>
                <div className="h-1/3 w-1/2 max-w-3xl flex flex-col bg-slate-900 rounded-3xl justify-center items-center shadow-lg shadow-black">
                    <p className={`${fugaz.className} text-5xl text-red-600`}>GAME OVER</p>
                    <p className={`${fugaz.className} text-xl`}>{`Score: ${score}`}</p>
                    {acceptedCookies ? <p className={`${fugaz.className} text-xl`}>{`Your High Score: ${highScore}`}</p> : null}
                    <button 
                        className={`group/button m-4 w-36 h-14 ${bgButton} rounded-full active:scale-95`}
                        onClick={resetGame}     
                    >
                        <p className={`${fugaz.className} p-1 text-xl text-transparent ${bgText} group-active/button:text-lg`}>TRY AGAIN</p>
                    </button>
                </div>
            </div>
        );
    }

    return render ? (
        <>
            <div className="game-container h-screen w-full overflow-hidden">
                <Game gameMode={gameMode} score={score} setScore={setScore} playerOrder={playerOrder} setVersus={changeVersus} endGame={setGameOver} setHighScore={acceptedCookies ? setHighScore : undefined}/>
                <Scorebar score={score} highScore={acceptedCookies ? highScore : undefined} />
                <VersusBlock versusState={versus} />
            </div>
            <GameOverScreen />
        </>
    ) : null;
}