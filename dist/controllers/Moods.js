var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserMoods from "../models/UserMoods.js";
import User from "../models/User.js";
export const updateBreak = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const currDate = new Date();
        currDate.setHours(0, 0, 0, 0);
        const userMood = yield UserMoods.findOneAndUpdate({
            userId,
            date: { $eq: currDate },
        }, { $inc: { breaks: 1 } }).lean();
        if (!userMood) {
            return res.status(404).json({ error: "User mood not found" });
        }
        res.status(200).json({ message: "Break updated successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export const createMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { mood, date, userId } = req.body;
        if (!mood || !date || !userId) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        let alredyMood = yield UserMoods.findOne({ userId, date });
        if (alredyMood) {
            alredyMood.mood = mood;
            alredyMood = yield alredyMood.save();
            const dat = (_a = alredyMood.date) === null || _a === void 0 ? void 0 : _a.toDateString();
            return res.status(200).json({ userMood: alredyMood, dat });
        }
        const userMood = yield UserMoods.create({ mood, date, userId });
        const dat = (_b = userMood.date) === null || _b === void 0 ? void 0 : _b.toDateString();
        return res.status(201).json({ userMood, dat });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
export const fetchMoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const today = new Date();
        const dayOfWeek = today.getDay();
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        lastMonday.setHours(0, 0, 0, 0);
        const thisSaturday = new Date(lastMonday);
        thisSaturday.setDate(lastMonday.getDate() + 6);
        thisSaturday.setHours(23, 59, 59, 999);
        // Fetch moods within the calculated date range
        const userMoods = yield UserMoods.find({
            userId,
            date: { $gte: lastMonday, $lt: thisSaturday },
        }).sort({ date: 1 });
        res.status(200).json({ userMoods });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
export const fetchBreak = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const currDate = new Date().toDateString();
        const userMood = yield UserMoods.findOne({
            userId,
            date: currDate,
        }).lean();
        if (!userMood) {
            return res.status(404).json({ error: "User mood not found" });
        }
        return res.status(200).json({ breaks: userMood.breaks });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});
