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
import Rating from "../models/Rating.js";
export const rateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Rate the product
    try {
        const { rating, userId } = req.body;
        const user = yield User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield Rating.create({ rating, userId });
        return res.status(201).json({ rmessage: "Rating added successfully" });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
