import { connectDB } from "@/app/lib/mongodb";
import { Player } from "@/app/lib/models/player";

export async function GET() {
    // Connects to DB and grabs all players
    await connectDB();
    const players = await Player.find();
    return Response.json(players);
}