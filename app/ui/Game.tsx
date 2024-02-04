'use client'

import PlayerCard from "./PlayerCard";
import { useState } from "react";
import getPlayerById from "../lib/data";
import { Player } from "../lib/default-data";
import { waitForSeconds } from "../lib/util";
import next from "next";

export default function Game({ gameMode, score, setScore, setVersus }: { gameMode: 'points' | 'goals' | 'assists', score: number, setScore: Function, setVersus: Function}) {
    const [comparable, setComparable] = useState<Player>(getPlayerById(1));
    const [compared, setCompared] = useState<Player>(getPlayerById(2));
    const [nextup, setNextUp] = useState<Player>(getPlayerById(3));
    const [clicked, setClicked] = useState(false);
    const [slide, setSlide] = useState(false);

    const compare = async (input: boolean) => {
        const ans = compared.stat >= comparable.stat;

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
        setScore(score + 1);
        setVersus(1);
        setSlide(true);
        await waitForSeconds(1500);

        /* sets playercards to new data */
        setComparable(compared);
        setCompared(nextup);
        setNextUp(getPlayerById(nextup ? nextup.id + 1 : 1));

        /* sets playercards back to original positions and setups */
        setSlide(false);
        setClicked(false);
        setVersus(0);
    };

    const wrongInput = () => {
        alert('u suck');
    };

    return (
        <div className={`h-full w-[150%] flex flex-row`}>
            <PlayerCard title={comparable.name} stat={comparable.stat} picture={comparable.picture} type="comparable" slide={slide} gameMode={gameMode} isMain={true}/>
            <PlayerCard
                title={compared.name} 
                stat={compared.stat} 
                picture={compared.picture} 
                type={clicked ? 'comparable' : 'compared'} 
                slide={slide}
                compareFn={compare} 
                gameMode={gameMode} 
                otherPlayer={comparable.name}/>
            <PlayerCard title={nextup.name} stat={nextup.stat} picture={nextup.picture} type="nextup" slide={slide} otherPlayer={compared.name} gameMode={gameMode}/>
        </div>
    );
}