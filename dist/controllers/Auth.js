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
import sendMail from "../utils/SendMail.js";
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, organisation, phoneNo } = req.body;
        if (!name || !email || !password || !organisation || !phoneNo) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const user = yield User.create({ name, email, password, organisation, phoneNo });
        const token = user.generateAuthToken();
        sendMail(token, email);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const user = yield User.findOne({ email }); // Find user by email
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
        const token = user.generateAuthToken();
        res.json({ user, token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
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
        const user = yield User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.isEmailVerified = true;
        yield user.save();
        res.status(200).json({ message: "Email verified" });
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expired" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }
        else {
            return res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
        }
    }
});
