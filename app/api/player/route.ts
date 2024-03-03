import { connectDB } from "@/app/lib/mongodb";
import { Player } from "@/app/lib/models/player";

export async function POST(req: Request) {      // adds player to db
    const { nhlID, name, points, goals, assists, playerImage } = await req.json();
    await connectDB();
    await Player.create({ nhlID, name, points, goals, assists, playerImage });

    return Response.json({ message: `Added: ${name}` });
}