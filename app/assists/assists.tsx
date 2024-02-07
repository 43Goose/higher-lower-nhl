import GameScreen from "../ui/GameScreen"

export default function ASSISTS({ searchParams }: { searchParams?: { [key: string]: string } }) {
    const acceptedCookies = searchParams?.cookies === "true" ? true : false;
    return <GameScreen gameMode="assists" acceptedCookies={acceptedCookies} />
}