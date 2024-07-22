import express from "express";
const router = express.Router();

import {
  updateBreak,
  createMood,
  fetchMoods,
  fetchBreak,
  updateFirstTime,
  fetchAverageMoods,
} from "../controllers/Moods.js";

router.post("/update-break", updateBreak);
router.post("/create-mood", createMood);
router.get("/fetch-average-moods", fetchAverageMoods);
router.get("/fetch-moods", fetchMoods);
router.get("/fetch-break", fetchBreak);
router.patch("/update-firsttime", updateFirstTime);

export default router;
