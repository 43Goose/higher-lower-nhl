import { useState } from "react";

export default function Scorebar({ score }: { score: number }) {
    return(
        <div className={`scorebar relative bottom-12 px-8`}>
            <p className={`score float-right`}>{`Score: ${score}`}</p>
        </div>
    );
}