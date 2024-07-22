import mongoose from "mongoose";
const WellbeingProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    health: {
        type: Number,
        default: 0,
    },
    resilience: {
        type: Number,
        default: 0,
    },
    culture: {
        type: Number,
        default: 0,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});
