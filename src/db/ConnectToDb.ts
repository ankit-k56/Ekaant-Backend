import mongoose from "mongoose";

const connectToDb = async (url: string) => {
  return mongoose.connect(url);
};

export default connectToDb;
