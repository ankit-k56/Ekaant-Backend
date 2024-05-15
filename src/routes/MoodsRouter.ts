import express from "express";
const router = express.Router();

import {
  updateBreak,
  createMood,
  fetchMoods,
  fetchBreak,
} from "../controllers/Moods.js";

router.post("/update-break", updateBreak);
router.post("/create-mood", createMood);
router.get("/fetch-moods", fetchMoods);
router.get("/fetch-break", fetchBreak);

export default router;
