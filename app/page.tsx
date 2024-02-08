import Image from "next/image";
import { fugaz } from "./ui/fonts";
import nhlLogo from "@/public/NHL.svg";
import bg from "@/public/main_img.jpg";
import Link from "next/link";
import { checkCookiesAccepted, cookiesAccepted } from "./lib/cookies";
import CookiesDisplay from "./ui/CookiesDisplay";

export default async function Home() {
  const btnStyle = `${fugaz.className} flex justify-center items-center m-4 w-32 h-14 bg-cyan-600 rounded-full hover:scale-110 active:scale-95 active:bg-cyan-700`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full h-full absolute top-0 brightness-50">
        <Image src={bg} alt="rogers arena" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center w-1/2 max-w-500px z-10">
        <div className={`${fugaz.className} my-4 text-3xl flex justify-center items-center *:mx-4`}>
          <h1 className="text-cyan-600">HIGHER</h1>
          <Image src={nhlLogo} alt="NHL logo" width={100} height={100} />
          <h1 className="text-red-600">LOWER</h1>
        </div>
        <h2 className="my-4 text-xl">Who has better stats?</h2>
        <p className="my-4 text-center">A clone of the popular Higher Lower game by Gabritrav01 that uses NHL player stats instead of google searches.</p>
        <div className={`flex flex-row w-full items-center justify-center`}>
          <Link href={{ pathname: '/classic', query: {cookies: await checkCookiesAccepted()}}} className={btnStyle}>CLASSIC</Link>
          <Link href={{ pathname: '/goals', query: {cookies: await checkCookiesAccepted()}}} className={btnStyle}>GOALS</Link>
          <Link href={{ pathname: '/assists', query: {cookies: await checkCookiesAccepted()}}} className={btnStyle}>ASSISTS</Link>
        </div>
      </div>
      {await checkCookiesAccepted() ? null : <CookiesDisplay />}
    </main>
  );
}
