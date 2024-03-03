import { Player } from "@/app/lib/models/player";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {    // gets player from db by ID
    await connectDB();
    try {
        const player = await Player.find({ nhlID: params.id });
        return Response.json(player);
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}