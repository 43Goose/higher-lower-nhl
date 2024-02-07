import { fugaz } from "./fonts";
import CountUp from "react-countup";

const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { style: 'decimal' });
}

export default function PlayerCard({
    title,
    stat,
    playerImage,
    type,
    slide,
    gameMode,
    otherPlayer,
    isMain,
    compareFn,
    disableBtns
}: {
    title: string,
    stat: number,
    playerImage: string,
    type: 'comparable' | 'compared' | 'nextup',
    slide: boolean,
    gameMode?: 'points' | 'goals' | 'assists',
    otherPlayer?: string,
    isMain?: boolean,
    compareFn?: any,
    disableBtns?: boolean
}) {
    function ComparableBody() {
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

    function ComparedBody() {
        return(
            <>
                <button className={`higher w-48 h-12 m-3 font-bold border-2 border-cyan-600 rounded-full hover:border-white`} onClick={() => { compareFn(true) }} disabled={disableBtns}>Higher</button>
                <button className={`lower w-48 h-12 m-3 font-bold border-2 border-cyan-600 rounded-full hover:border-white`} onClick={() => { compareFn(false) }} disabled={disableBtns}>Lower</button>
                <p>{`${gameMode} than ${otherPlayer}`}</p>
            </>
        );
    }

    return (
        <div className={`${type} flex flex-col justify-center items-center h-full w-1/3 text-lg ${slide ? '-translate-x-full transition-transform duration-500' : 'translate-x-0'}`}>
            <div style={{backgroundImage: `url(${playerImage})`}} className="h-full w-full bg-cover bg-center brightness-50"></div>
            <div className="card-content absolute flex flex-col justify-center items-center">
                <p className={`${fugaz.className} text-4xl`}>"{title}"</p>
                <p className="">has</p>
                {
                    type === 'comparable' ? <ComparableBody /> : 
                    <ComparedBody />
                }
            </div>
        </div>
    );
}