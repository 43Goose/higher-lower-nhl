import { fugaz } from "./fonts";
import { useState } from "react";
import CountUp from "react-countup";

const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { style: 'decimal' });
}

function ComparableBody({ stat, gameMode, isMain }: { stat: number, gameMode: string | undefined, isMain: boolean | undefined }) {
    return(
        <>
            {
                /* checks if element is the original comparable to avoid playing counter on every render */
                isMain ? <p className={`${fugaz.className} text-5xl text-cyan-600`}>{formatNumber(stat)}</p> : 
                <CountUp className={`${fugaz.className} text-5xl text-cyan-600`} end={stat} formattingFn={formatNumber} duration={0.5}></CountUp>
            }
            <p>{`career ${gameMode}`}</p>
        </>
    );
}

function ComparedBody({ compare, gameMode, otherPlayer }: { compare: any, gameMode: string | undefined, otherPlayer: string | undefined }) {
    return(
        <>
            <button className={`higher w-48 h-12 m-3 border-2 border-cyan-600 rounded-full hover:border-white`} onClick={() => { compare(true) }}>Higher</button>
            <button className={`lower w-48 h-12 m-3 border-2 border-cyan-600 rounded-full hover:border-white`} onClick={() => { compare(false) }}>Lower</button>
            <p>{`${gameMode} than ${otherPlayer}`}</p>
        </>
    );
}

export default function PlayerCard({
    title,
    stat,
    picture,
    type,
    slide,
    gameMode,
    otherPlayer,
    isMain,
    compareFn
}: {
    title: string,
    stat: number,
    picture: string,
    type: 'comparable' | 'compared' | 'nextup',
    slide: boolean,
    gameMode?: 'points' | 'goals' | 'assists',
    otherPlayer?: string,
    isMain?: boolean,
    compareFn?: any
}) {
    return (
        <div className={`${type} flex flex-col justify-center items-center h-full w-1/3 ${slide ? '-translate-x-full transition-transform duration-500' : 'translate-x-0'}`}>
            <p className={`${fugaz.className} text-4xl`}>"{title}"</p>
            <p>has</p>
            {
                type === 'comparable' ? <ComparableBody stat={stat} gameMode={gameMode} isMain={isMain} /> : 
                <ComparedBody compare={compareFn} gameMode={gameMode} otherPlayer={otherPlayer} />
            }
        </div>
    );
}