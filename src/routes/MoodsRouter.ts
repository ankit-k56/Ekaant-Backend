import express from "express";
const router = express.Router();

import { updateBreak, createMood, fetchMoods } from "../controllers/Moods.js";

router.post("/update-break/:id", updateBreak);
router.post("/create-mood", createMood);
router.get("/fetch-moods", fetchMoods);

export default router;
