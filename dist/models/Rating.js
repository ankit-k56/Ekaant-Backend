import mongoose from "mongoose";
const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, "Please enter your rating"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
export default mongoose.model("Rating", RatingSchema);
