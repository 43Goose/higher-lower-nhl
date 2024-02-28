import { connectDB } from "@/app/lib/mongodb";
import { Player } from "@/app/lib/models/player";

export async function GET() {
    await connectDB();
    const players = await Player.find();
    return Response.json(players);
}