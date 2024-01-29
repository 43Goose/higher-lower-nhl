import PlayerCard from "../ui/PlayerCard";

export default function CLASSIC() {
    return(
        <div className="h-screen w-full flex flex-row">
            <PlayerCard title="Test" stat={100000} picture="a" type="comparable" />
            <PlayerCard title="Test 2" stat={150000} picture="b" type="compared" />
        </div>
    );
}