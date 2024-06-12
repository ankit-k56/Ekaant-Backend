import mongoose from "mongoose";
import "dotenv/config";
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  organisation: string;
  hasPaid: boolean;
  isEmailVerified: boolean;
  phoneNo: string;
  freeTrailStartDate: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
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
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phoneNo: {
      type: String,
      required: [true, "Please enter your phone number"],
      minlength: [10, "Phone number must be at least 10 characters long"],
      maxlength: [13, "Phone number must be at most 13 characters long"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [1024, "Password must be at most 1024 characters long"],
    },
    hasPaid: {
      type: Boolean,
      default: false,
    },

    organisation: {
      type: String,
      required: [true, "Please enter your organisation"],
      minlength: [3, "Organisation must be at least 3 characters long"],
      maxlength: [255, "Organisation must be at most 255 characters long"],
    },
    freeTrailStartDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Add timestamps to the schema
  }
);

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

export default mongoose.model<IUser>("User", UserSchema);
