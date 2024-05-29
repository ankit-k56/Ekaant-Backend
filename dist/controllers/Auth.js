var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/SendMail.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, organisation, phoneNo } = req.body;
        if (!name || !email || !password || !organisation || !phoneNo) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const user = yield User.create({
            name,
            email,
            password: hashedPassword,
            organisation,
            phoneNo,
        });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        sendMail(token, email);
        return res.status(201).json({ user, token });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const user = yield User.findOne({ email }).lean(); // Find user by email
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.isEmailVerified) {
            return res.status(400).json({ error: "Please verify your email" });
        }
        const isPsswordMatch = yield bcrypt.compare(password, user.password);
        if (!isPsswordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        return res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                organisation: user.organisation,
                phoneNo: user.phoneNo,
            },
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(400).json({ error: "Invalid token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decoded;
        yield User.findByIdAndUpdate(_id, {
            isEmailVerified: true,
        });
        res
            .status(200)
            .sendFile(path.join(__dirname, "../../public/verified.html"));
        // return res.status(200).json({ message: "Email verified" });
    }
    catch (error) {
        // if (error instanceof jwt.TokenExpiredError) {
        //   return res.status(401).json({ error: "Token expired" });
        // } else if (error instanceof jwt.JsonWebTokenError) {
        //   return res.status(401).json({ error: "Invalid token" });
        // } else {
        //   return res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
        // }
        console.log(error);
        res.status(500).sendFile(path.join(__dirname, "../../public/failed.html"));
    }
});
