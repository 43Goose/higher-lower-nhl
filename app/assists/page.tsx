import { generateOrder, getPlayerList } from "../lib/data/data";
import GameScreen from "../ui/game-display"

// Assists gamemode page
export default async function ASSISTS({ searchParams }: { searchParams?: { [key: string]: string } }) {
    const acceptedCookies = searchParams?.cookies === "true" ? true : false;
    return <GameScreen gameMode="assists" originalOrder={await generateOrder()} playerList={await getPlayerList()} acceptedCookies={acceptedCookies} />
}