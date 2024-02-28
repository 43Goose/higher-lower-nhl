import { getHeadShot, updatePlayer } from "@/app/lib/data/api-functions";
import { Player } from "@/app/lib/models/player";
import { connectDB } from "@/app/lib/mongodb";
import Card from "./card";
import React, { MouseEvent } from "react";

export default async function CardWrapper() {
    await connectDB();
    const players = await Player.aggregate([ { $sample: { size: 4 } } ]);
    const playerStats: Array<{id: string, points: number, goals: number, assists: number, image: string}> = await Promise.all(players.map(async p => {
        return { id: p.nhlID, points: p.points, goals: p.goals, assists: p.assists, image: await getHeadShot(p.nhlID)};
    }));

    return (
        <>
            <Card player={playerStats[0]} />
            <Card player={playerStats[1]} />
            <Card player={playerStats[2]} />
            <Card player={playerStats[3]} />
        </>
    );
}