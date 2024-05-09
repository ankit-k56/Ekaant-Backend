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
export const updateBreak = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userMood = yield UserMoods.findById(id);
        if (!userMood) {
            return res.status(404).json({ error: "User mood not found" });
        }
        yield UserMoods.updateOne({ _id: id }, { breaks: userMood.breaks + 1 });
        res.status(200).json({ message: "Break updated successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export const createMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mood, date, breaks, userId } = req.body;
        if (!mood || !date || !breaks || !userId) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const userMood = yield UserMoods.create({ mood, date, breaks, userId });
        res.status(201).json({ userMood });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export const fetchMoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const userMoods = yield UserMoods.find({
            userId,
            date: { $gte: oneWeekAgo },
        });
        res.status(200).json({ userMoods });
    }
    catch (error) { }
});
