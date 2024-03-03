'use client'

import { updateAllPlayers } from "@/app/lib/data/api-functions";
import { fugaz } from "../fonts";

// Quick actions component for dashboard
export default function QuickActions() {
    const handleUpdate = async () => {
        await updateAllPlayers();
    }

    // Plays audio for clown horn button (I really couldn't think of anything else to fill up the dashboard page)
    const playSound = () => {
        const audio: HTMLAudioElement = document.getElementById('audio') as HTMLAudioElement;
        audio.volume = 0.25;
        audio.play();
    }

    return (
        <div className={`${fugaz.className} w-full flex justify-evenly bg-slate-900 rounded-lg py-4 px-2 md:px-4`}>
            <div className="p-2 rounded-xl bg-slate-950 md:py-4 md:px-8">
                <button className="btn-primary mx-0" onClick={handleUpdate}>UPDATE ALL</button>
            </div>
            <div className="p-2 rounded-xl bg-slate-950 md:py-4 md:px-8">
                <div>
                    <button className="btn-primary mx-0" onClick={playSound}>CLOWN HORN</button>
                    <audio id="audio" src="/sound.mp3" />
                </div>
            </div>
        </div>
    );
}