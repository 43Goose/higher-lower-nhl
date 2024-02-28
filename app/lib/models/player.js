import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema(
    {
        nhlID: String,
        name: String,
        points: Number,
        goals: Number,
        assists: Number,
        playerImage: String
    }
);

export const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);