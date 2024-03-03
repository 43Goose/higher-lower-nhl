import { connectDB } from "@/app/lib/mongodb";
import { Player } from "@/app/lib/models/player";

export async function POST(req: Request, { params }: { params: { id: string } }) {       // Updates player with given ID in db
    await connectDB();
    const body = await req.json();
    let updatedStatsObj = {
        points: body.points,
        goals: body.goals,
        assists: body.assists
    };

    if (body.hasOwnProperty('new_image')) updatedStatsObj['playerImage' as keyof typeof updatedStatsObj] = body.new_image;
    try {
        await Player.findOneAndUpdate({ nhlID: params.id }, updatedStatsObj, { returnDocument: 'after' });
        return Response.json({ message: 'Updated successfully' });
    } catch (e) {
        console.error(e);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}