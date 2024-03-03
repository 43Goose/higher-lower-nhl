'use client'

import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import { updatePlayer } from "@/app/lib/data/api-functions";
import { fugaz } from "../fonts";

// Card component for random player
export default function Card({
    player
}: {
    player: { id: string, points: number, goals: number, assists: number, image: string }
}) {
    const [disabled, setDisabled] = useState(false);    // Disabled state for update button

    // Updates player and disables button on user click
    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.disabled = true;
        setDisabled(true);
        await updatePlayer(player.id);
    }

    return (
        <div className={`${fugaz.className} rounded-xl flex flex-row flex-center bg-slate-900 p-2 shadow-sm`}>
            <div className="w-1/3">
                <div className="max-w-24 max-h-24 bg-main rounded-full overflow-hidden">
                    <Image src={player.image} width={96} height={96} alt="Player Image" />
                </div>
            </div>
            <div className="w-2/3 h-full">
                <div className="w-full flex flex-row justify-evenly md:justify-between text-center p-2">
                    <span className="flex flex-col">
                        <p className="text-main">{'P'}</p>
                        <p>{player.points}</p>
                    </span>
                    <span className="flex flex-col">
                        <p className="text-main">{'G'}</p>
                        <p>{player.goals}</p>
                    </span>
                    <span className="flex flex-col">
                        <p className="text-main">{'A'}</p>
                        <p>{player.assists}</p>
                    </span>
                </div>
                <div className="w-full flex justify-center">
                    <button className={`px-2 py-1 rounded-full ${disabled ? 'bg-cyan-700' : 'bg-main hover:scale-110 active:scale-95 active:bg-cyan-700'}`} onClick={handleClick}>UPDATE</button>
                </div>
            </div>
        </div>
    );
}