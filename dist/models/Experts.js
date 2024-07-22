import mongoose from "mongoose";
const ExpertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expertise: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
