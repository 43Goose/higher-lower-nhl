import { fugaz } from "./fonts";

export default function Scorebar({ score, highScore }: { score: number, highScore?: number }) {
    return(
        <div className={`scorebar ${fugaz.className} text-2xl relative bottom-16 px-10`}>
            <p className={`score float-right`}>{`Score: ${score}`}</p>
            {highScore != undefined ? <p className="high-score float-left">{`High Score: ${highScore}`}</p> : null}
        </div>
    );
}