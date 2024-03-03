'use client'

import { fugaz } from "@/app/ui/fonts";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Login page for dashboard
export default function LoginForm() {
    const [username, setUsername] = useState('');                                               // Username and password states
    const [password, setPassword] = useState('');
    const router = useRouter();                                                                 // useRouter hook for rerouting after success

    // Handles submission of login form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {                                                           // Checks if username or password fields are empty and alerts if so
            alert("Fields can't be empty");
            return;
        }

        try {
            const res = await signIn('credentials', { username, password, redirect: false });   // Attempts signin with given credentials

            if (res?.error) {                                                                   // Returns error if credentials were incorrect
                console.log('Invalid creds');
                return;
            }

            router.push('/dashboard');                                                          // Reroutes after success
        } catch (error) {
            console.error(error);
        }
    }

    // Handles username input change
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    // Handles password input change
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className="w-full h-screen flex flex-center">
            <div className="w-5/6 max-h-4/5 bg-slate-900 flex items-center flex-col text-center rounded-3xl md:p-12 py-8 px-12 md:w-1/3 md:h-2/3">
                <p className={`${fugaz.className} text-3xl text-main`}>LOGIN</p>
                <form className="flex flex-col justify-evenly w-full h-full md:w-2/3 text-xl md:my-12 my-8" onSubmit={handleSubmit}>
                    <div className="relative flex flex-col my-12">
                        <input className="peer bg-transparent border-b-2 border-stone-500 focus:border-main focus:outline-none transition-colors z-10" type="text" value={username} placeholder=" " onChange={handleUsername} />
                        <label className="absolute peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-main peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-focus:text-main peer-[&:not(:placeholder-shown)]:scale-90 transition-all">Username</label>
                    </div>
                    <div className="relative flex flex-col my-12">
                        <input className="peer bg-transparent border-b-2 border-stone-500 focus:border-main focus:outline-none transition-colors z-10" type="password" value={password} placeholder=" " onChange={handlePassword} />
                        <label className="absolute peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-main peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-focus:text-main peer-[&:not(:placeholder-shown)]:scale-90 transition-all">Password</label>
                    </div>
                    <input className="mx-auto btn-primary" type="submit" value={'LOGIN'} />
                </form>
            </div>
        </div>
    );
}