'use client'

import Link from "next/link";
import NavLinks from "./nav-links";
import Image from "next/image";
import { fugaz } from "../fonts";
import nhlLogo from '@/public/NHL.svg';
import { PowerIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Side nav component for navigating dashboard pages
export default function SideNav() {
    const router = useRouter();

    // Signs user out when they hit the button... duh
    const handleSignout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    }

    return (
        <div className="flex h-full flex-col px-3 py-4 bg-slate-900 md:px-2">
            <Link className="mb-2 flex h-20 items-center justify-center rounded-md bg-blue-900 p-4 md:h-40" href={'/'}>
                <div className={`${fugaz.className} flex flex-center text-3xl scale-50 *:mx-2`}>
                    <h1 className="text-main">HIGHER</h1>
                    <Image src={nhlLogo} alt="NHL logo" width={100} height={100} />
                    <h1 className="text-sec">LOWER</h1>
                </div>
            </Link>
            <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md md:block"></div>
                <button
                    className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-950 xsm:p-3 text-sm font-medium hover:bg-slate-800 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 2xsm:px-2"
                    onClick={handleSignout}
                >
                    <PowerIcon className="w-6" />
                    <p className="hidden md:block">SIGN OUT</p>
                </button>
            </div>
        </div>
    );

}