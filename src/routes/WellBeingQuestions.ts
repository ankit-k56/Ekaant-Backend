import express from "express";
import { postQuestion, postAnswer } from "../controllers/WellBeing.js";

const router = express.Router();

router.post("/question", postQuestion);
router.post("/answer", postAnswer);

export default router;
