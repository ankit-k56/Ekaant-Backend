import mongoose from "mongoose";
const UserMood = new mongoose.Schema({
    mood: String,
    date: {
        type: Date,
        default: Date.now,
    },
    breaks: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});
export default mongoose.model("UserMood", UserMood);
