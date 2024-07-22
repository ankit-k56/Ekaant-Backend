import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema({
    quesNum: {
        type: Number,
        required: true,
    },
    ques: {
        type: String,
        required: true,
    },
});
export default mongoose.model("Question", QuestionSchema);
