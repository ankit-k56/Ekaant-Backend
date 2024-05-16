import mongoose from "mongoose";

const UserMood = new mongoose.Schema({
  mood: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
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
