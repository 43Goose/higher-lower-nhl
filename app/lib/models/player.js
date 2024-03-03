import mongoose, { Schema } from "mongoose";

// PLayer schema for MongoDB
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