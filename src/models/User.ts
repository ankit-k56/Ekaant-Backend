import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  organisation: string;
  generateAuthToken: () => string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
    maxlength: [255, "Email must be at most 255 characters long"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [1024, "Password must be at most 1024 characters long"],
  },
  organisation: {
    type: String,
    required: [true, "Please enter your organisation"],
    minlength: [3, "Organisation must be at least 3 characters long"],
    maxlength: [255, "Organisation must be at most 255 characters long"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
export default mongoose.model<IUser>("User", UserSchema);
