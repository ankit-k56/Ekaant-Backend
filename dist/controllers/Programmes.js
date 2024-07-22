var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Programme, ProgrammeUserTable } from "../models/ProgrammeModel.js";
export const postProgramme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, date } = req.body;
        const programme = yield Programme.create({ name, date });
        return res.status(201).json(programme);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
export const getProgrammes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const programmes = yield Programme.find();
        return res.status(200).json(programmes);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
export const postUserProgramme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { programmeId, userId } = req.body;
        const userProgramme = yield ProgrammeUserTable.create({
            programmeId,
            userId,
        });
        return res.status(201).json(userProgramme);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
