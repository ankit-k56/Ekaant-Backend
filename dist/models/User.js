var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import "dotenv/config";
const UserSchema = new mongoose.Schema({
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
}, {
    timestamps: true, // Add timestamps to the schema
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
export default mongoose.model("User", UserSchema);
