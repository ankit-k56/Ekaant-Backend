import mongoose from "mongoose";

interface Question extends mongoose.Document {
  quesNum: number;
  ques: string;
}

const QuestionSchema = new mongoose.Schema<Question>({
  quesNum: {
    type: Number,
    required: true,
  },
  ques: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Question>("Question", QuestionSchema);
