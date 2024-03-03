import { getPlayerList } from "../lib/data/data";
import { generateOrder } from "../lib/data/data";
import GameScreen from "../ui/game-display"

export default async function CLASSIC({ searchParams }: { searchParams?: { [key: string]: string } }) {
    const acceptedCookies = searchParams?.cookies === "true" ? true : false;
    return <GameScreen gameMode="points" originalOrder={await generateOrder()} playerList={await getPlayerList()} acceptedCookies={acceptedCookies} />
}

/* --- TODO: ---

    - Add scorebar                      |   C
    - Add animated correct/incorrect    |   C
    - Setup real player db              |   C
    - Add cookies/saving scores         |   C
    - Quality control EVERYTHING        |   I
*/