'use client'

import { useState } from "react";
import { waitForSeconds } from "@/app/lib/util";
import { fugaz } from "@/app/ui/fonts";
import { checkExists, updateAllPlayers, updatePlayer } from "@/app/lib/data/api-functions";

// Update player page of dashboard
export default function UpdateForm() {
    const [value, setvalue] = useState('');                                 // State for ID input value
    const [statusMsg, setStatus] = useState('');                                // State for setting status message
    const [showMsg, setShowMsg] = useState(false);                              // State for toggling display of status message

    // Handles change in ID input value
    const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setvalue(e.target.value);
    }

    // Handles form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Working...');
        setShowMsg(true);

        if (value != '') {                                                     // Checks if ID field isn't empty and updates specific player if so
            updateOne();
        } else {                                                                // Updates all players if ID field is empty
            await updateAllPlayers();
            setStatus(`Updated All Players`);
        }

        await waitForSeconds(1000);
        setShowMsg(false);
    }

    // Updates single player
    const updateOne = async () => {
        try {
            if (await checkExists(value)) {        // Checks if player exists and if so updates with current NHL stats
                const player = await updatePlayer(value);
                setStatus(`Updated: ${player.name}`);
            } else {
                setStatus("Error: Player doesn't exist!");
            }
        } catch (error) {
            console.error(error);
            setStatus('Error: Invalid ID!');
        }
    }

    return (
        <div className="h-full w-full flex flex-center">
            <div className={`max-w-lg w-3/4 h-4/5 bg-slate-900 flex items-center flex-col text-center rounded-3xl md:p-12 py-8 px-12 md:w-1/2 md:h-2/3`}>
                <p className={`${fugaz.className} text-main md:text-5xl text-4xl`}>UPDATE PLAYERS</p>
                <form className="flex flex-col justify-between w-full h-full md:w-2/3 text-xl md:my-12 my-8" onSubmit={handleSubmit}>
                    <div className="relative flex flex-col text-left">
                        <input className="peer bg-transparent border-b-2 border-stone-500 focus:border-main focus:outline-none transition-colors z-10" type="text" value={value} placeholder=" " onChange={idChange} />
                        <label className="absolute peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-main peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-focus:text-main peer-[&:not(:placeholder-shown)]:scale-90 transition-all">Player ID</label>
                        <p className="text-sm">Enter ID or leave blank to update all</p>
                    </div>
                    <input className="mx-auto btn-primary" type="submit" value={'UPDATE'} />
                </form>
                <p className={`message ${showMsg ? 'text-main' : 'text-transparent'} text-xl font-bold transition-colors`}>{statusMsg}</p>
            </div>
        </div>
    );
}