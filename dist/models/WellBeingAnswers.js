import mongoose from "mongoose";
const WellBeingAnswerSchema = new mongoose.Schema({
    quesNo: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
export default mongoose.model("WellBeingAnswers", WellBeingAnswerSchema);
