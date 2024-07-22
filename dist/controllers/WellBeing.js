var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import WellBeingAnswers from "../models/WellBeingAnswers.js";
import Questions from "../models/Questions.js";
export const postQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quesNum, ques } = req.body;
        yield Questions.create({
            quesNum,
            ques,
        });
        return res.status(200).json({ message: "Question created successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const postAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quesNum, score, userId } = req.body;
        const question = yield Questions.findOne({ quesNum }).lean();
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        const wellbeingAnswer = yield WellBeingAnswers.create({
            quesNo: quesNum,
            score,
            user: userId,
        });
        return res.status(201).json(wellbeingAnswer);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
