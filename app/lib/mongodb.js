import mongoose from "mongoose";

/** Connects to Mongo DB */
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (e) {
        console.error(e);
    }
};