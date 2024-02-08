'use client'

import { useState } from "react";
import { cookiesAccepted } from "../lib/cookies";
import { fugaz } from "./fonts";

export default function CookiesDisplay() {
    const [hide, setHide] = useState(false);

    const btnStyle = `${fugaz.className} flex justify-center items-center m-4 w-32 h-14 bg-cyan-600 rounded-full hover:scale-110 active:scale-95 active:bg-cyan-700`;

    const acceptFn = async () => {
        cookiesAccepted();
    }
    
    const declineFn = async () => {
        setHide(true);
    }

    return(
      <div className={`absolute h-full w-full flex justify-center items-center top-0 z-20 ${hide ? 'hidden' : null}`}>
        <div className="absolute h-full w-full bg-black opacity-30"></div>
        <div className="flex flex-col justify-center items-center p-8 bg-slate-900 rounded-3xl z-30">
          <p className={`${fugaz.className} text-2xl`}>ACCEPT COOKIES?</p>
          <p>This website uses cookies <span className="font-bold">ONLY</span> to keep your high score.</p>
          <div className="w-full flex flex-row justify-center">
            <button className={btnStyle} onClick={acceptFn}>ACCEPT</button>
            <button className={btnStyle} onClick={declineFn}>DECLINE</button>
          </div>
        </div>
      </div>
    );
  }