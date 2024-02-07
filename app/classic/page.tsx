import GameScreen from "../ui/GameScreen"

export default function CLASSIC({ searchParams }: { searchParams?: { [key: string]: string } }) {
    const acceptedCookies = searchParams?.cookies === "true" ? true : false;
    return <GameScreen gameMode="points" acceptedCookies={acceptedCookies} />
}

/* --- TODO: ---

    - Add scorebar                      |   C
    - Add animated correct/incorrect    |   C
    - Setup and connect real player db  |   I
    - Add cookies/saving scores         |   3/4
    - Quality control EVERYTHING        |   I
*/