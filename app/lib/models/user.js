import mongoose, { Schema } from "mongoose";

// User schema for MongoDB
const userSchema = new Schema(
    {
        username: String,
        password: String
    }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);