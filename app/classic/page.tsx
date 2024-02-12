import { generateOrder } from "../lib/data";
import GameScreen from "../ui/GameScreen"

export default function CLASSIC({ searchParams }: { searchParams?: { [key: string]: string } }) {
    const acceptedCookies = searchParams?.cookies === "true" ? true : false;
    return <GameScreen gameMode="points" originalOrder={generateOrder()} acceptedCookies={acceptedCookies} />
}

/* --- TODO: ---

    - Add scorebar                      |   C
    - Add animated correct/incorrect    |   C
    - Setup real player db              |   I
    - Add cookies/saving scores         |   C
    - Quality control EVERYTHING        |   I
*/