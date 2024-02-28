'use client'

import { useState } from "react";
import { fugaz } from "../../ui/fonts";
import { waitForSeconds } from "../../lib/util";
import { PlayerInterface } from "@/app/lib/data/definitions";
import { addPlayer, checkExists } from "@/app/lib/data/api-functions";

export default function AddForm() {
    const [value, setValue] = useState('');
    const [statusMsg, setStatus] = useState('');
    const [showMsg, setShowMsg] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Working...');
        setShowMsg(true);

        try {
            if(await checkExists(value)) {
                setStatus('Error: Player already exists!');
            } else {
                const player = await addPlayer(value);
                setStatus(`Added: ${player.name}`);
            }
        } catch (error) {
            console.error(error);
            setStatus('Error: Invalid ID!');
        }

        await waitForSeconds(1000);
        setShowMsg(false);
    }

    return (
        <div className="h-full w-full flex flex-center">
            <div className={`max-w-lg w-3/4 h-4/5 bg-slate-900 flex items-center flex-col text-center rounded-3xl md:p-12 py-8 px-12 md:w-1/2 md:h-2/3`}>
                <p className={`${fugaz.className} text-main md:text-5xl text-4xl`}>ADD PLAYER</p>
                <form className="flex flex-col justify-between w-full h-full md:w-2/3 text-xl md:my-12 my-8" onSubmit={handleSubmit}>
                    <div className="relative flex flex-col">
                        <input className="peer bg-transparent border-b-2 border-stone-500 focus:border-main focus:outline-none transition-colors z-10" type="text" value={value} placeholder=" " onChange={handleChange} />
                        <label className="absolute peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-main peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-focus:text-main peer-[&:not(:placeholder-shown)]:scale-90 transition-all">Player ID</label>
                    </div>
                    <input className="mx-auto btn-primary" type="submit" value={'ADD'} />
                </form>
                <p className={`message ${showMsg ? 'text-main' : 'text-transparent'} text-xl font-bold transition-colors`}>{statusMsg}</p>
            </div>
        </div>
    );
}