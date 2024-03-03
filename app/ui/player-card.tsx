import { fugaz } from "./fonts";
import CountUp from "react-countup";

const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { style: 'decimal' });
}

// Player card component for showing player info, image and interactivity
export default function PlayerCard({
    title,
    stat,
    playerImage,
    type,
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
    gameMode?: 'points' | 'goals' | 'assists',
    otherPlayer?: string,
    isMain?: boolean,
    compareFn?: any,
    disableBtns?: boolean
}) {
    function ComparableBody() {
        return (
            <>
                {
                    /* checks if element is the original comparable to avoid playing counter on every render */
                    isMain || disableBtns ? <p className={`${fugaz.className} text-5xl text-main`}>{formatNumber(stat)}</p> :
                        <CountUp className={`${fugaz.className} text-5xl text-main`} end={stat} formattingFn={formatNumber} duration={0.5}></CountUp>
                }
                <p>{`career ${gameMode}`}</p>
            </>
        );
    }

    function ComparedBody() {
        return (
            <>
                <button className={`higher md:w-48 w-40 h-12 m-3 font-bold border-2 border-main rounded-full hover:border-white`} onClick={() => compareFn(true)} disabled={disableBtns}>Higher</button>
                <button className={`lower md:w-48 w-40 h-12 m-3 font-bold border-2 border-main rounded-full hover:border-white`} onClick={() => compareFn(false)} disabled={disableBtns}>Lower</button>
                <p>{`${gameMode} than ${otherPlayer}`}</p>
            </>
        );
    }

    return (
        <div className={`${type} flex flex-col flex-center md:h-full md:w-1/3 h-1/3 w-full text-lg text-center `}>
            <div style={{ backgroundImage: `url(${playerImage})` }} className="h-full w-full bg-cover bg-center brightness-50"></div>
            <div className="card-content absolute flex flex-col flex-center">
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