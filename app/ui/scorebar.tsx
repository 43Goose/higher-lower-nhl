import { fugaz } from "./fonts";

// It's a scorebar... it shows... the score :)
export default function Scorebar({ score, highScore }: { score: number, highScore?: number }) {
    return (
        <div className={`scorebar ${fugaz.className} absolute w-full md:text-2xl text-xl md:bottom-6 bottom-2 md:px-10 px-6`}>
            <p className={`score float-right`}>{`Score: ${score}`}</p>
            {highScore != undefined ? <p className="high-score float-left">{`High Score: ${highScore}`}</p> : null}
        </div>
    );
}