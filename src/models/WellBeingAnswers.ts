import mongoose from "mongoose";

interface WellBeingAnswers extends mongoose.Document {
  quesNo: number;
  score: number;
  user: mongoose.Schema.Types.ObjectId;
}

const WellBeingAnswerSchema = new mongoose.Schema<WellBeingAnswers>({
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

export default mongoose.model<WellBeingAnswers>(
  "WellBeingAnswers",
  WellBeingAnswerSchema
);
