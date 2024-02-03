import Game from "../ui/Game";

export default function CLASSIC() {
    return(
        <div className="game-container h-screen w-full overflow-hidden">
            <Game gameMode="points" />
        </div>
    );
}

/* --- TODO: ---

    - Add scorebar                      |   X
    - Add animated correct/incorrect    |   X
    - Setup and connect real player db  |   X
    - Quality control EVERYTHING        |   X
*/