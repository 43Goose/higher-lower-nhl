'use client'

import { useState } from "react";
import { cookiesAccepted } from "../lib/cookies";
import { fugaz } from "./fonts";

// Cookies prompt component
export default function CookiesDisplay() {
  const [hide, setHide] = useState(false);

  const acceptFn = async () => {
    cookiesAccepted();
  }

  const declineFn = async () => {
    setHide(true);
  }

  return (
    <div className={`absolute h-full w-full flex flex-center top-0 z-20 ${hide ? 'hidden' : null}`}>
      <div className="absolute h-full w-full bg-black opacity-30"></div>
      <div className="flex flex-col flex-center md:w-auto w-11/12 md:p-8 py-8 px-4 text-center bg-slate-900 rounded-3xl z-30">
        <p className={`${fugaz.className} text-2xl`}>ACCEPT COOKIES?</p>
        <p>This website uses cookies <span className="font-bold">ONLY</span> to keep your high score.</p>
        <div className="w-full flex flex-row justify-center">
          <button
            className={`${fugaz.className} btn-primary`}
            onClick={acceptFn}
          >ACCEPT</button>
          <button
            className={`${fugaz.className} btn-primary`}
            onClick={declineFn}
          >DECLINE</button>
        </div>
      </div>
    </div>
  );
}