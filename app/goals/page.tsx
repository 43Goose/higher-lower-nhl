import { generateOrder } from "../lib/data";
import GameScreen from "../ui/GameScreen"

export default function GOALS({ searchParams }: { searchParams?: { [key: string]: string } }) {
    const acceptedCookies = searchParams?.cookies === "true" ? true : false;
    return <GameScreen gameMode="goals" originalOrder={generateOrder()} acceptedCookies={acceptedCookies} />
}