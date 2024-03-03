import Image from "next/image";
import { fugaz } from "./ui/fonts";
import bg from "@/public/main_img.jpg";
import Link from "next/link";
import { checkCookiesAccepted, cookiesAccepted } from "./lib/cookies";
import CookiesDisplay from "./ui/cookies-display";
import nhlLogo from '@/public/NHL.svg';

// The home page! I think everything here is pretty easy to understand if you've used react before (and I'm lazy) so I'm not gonna bother writing comments
export default async function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center lg:p-24">
      <div className="w-full h-full absolute top-0 brightness-50">
        <Image src={bg} alt="rogers arena" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center md:w-1/2 max-w-500px text-center z-10">
        <div className={`${fugaz.className} my-4 text-3xl 2xsm:scale-75 xsm:scale-100 flex flex-center md:*:mx-4 *:mx-2`}>
          <h1 className="text-main">HIGHER</h1>
          <Image src={nhlLogo} alt="NHL logo" width={100} height={100} />
          <h1 className="text-sec">LOWER</h1>
        </div>
        <h2 className="lg:my-4 my-2 text-xl">Who has better stats?</h2>
        <p className="lg:my-4 my-2">A clone of the popular Higher Lower game by Gabritrav01 that uses NHL player stats instead of google searches. Stats are updated after every season.</p>
        <div className={`flex md:flex-row flex-col w-full flex-center`}>
          <Link
            href={{ pathname: '/points', query: { cookies: await checkCookiesAccepted() } }}
            className={`${fugaz.className} btn-primary`}
          >CLASSIC</Link>
          <Link
            href={{ pathname: '/goals', query: { cookies: await checkCookiesAccepted() } }}
            className={`${fugaz.className} btn-primary`}
          >GOALS</Link>
          <Link
            href={{ pathname: '/assists', query: { cookies: await checkCookiesAccepted() } }}
            className={`${fugaz.className} btn-primary`}
          >ASSISTS</Link>
        </div>
      </div>
      {await checkCookiesAccepted() ? null : <CookiesDisplay />}
      <div className={`footer w-full absolute bottom-4 px-4`}>
        <p className={`${fugaz.className} float-right`}>CREATED BY: GOOSE</p>
      </div>
    </main>
  );
}
