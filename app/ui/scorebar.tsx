import { fugaz } from "./fonts";

// It's a scorebar... it shows... the score :)
export default function Scorebar({ score, highScore }: { score: number, highScore?: number }) {
    return (
        <div className={`scorebar ${fugaz.className} absolute w-full text-xl px-6 top-2 md:px-10 md:bottom-6 md:top-auto md:text-2xl`}>
            <p className={`score float-right`}>{`Score: ${score}`}</p>
            {highScore != undefined ? <p className="high-score float-left">{`High Score: ${highScore}`}</p> : null}
        </div>
    );
}