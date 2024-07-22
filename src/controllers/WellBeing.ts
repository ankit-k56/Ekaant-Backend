import WellBeingAnswers from "../models/WellBeingAnswers.js";

import Questions from "../models/Questions.js";
import { Request, Response } from "express";

export const postQuestion = async (req: Request, res: Response) => {
  try {
    const { quesNum, ques } = req.body;
    await Questions.create({
      quesNum,
      ques,
    });
    return res.status(200).json({ message: "Question created successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const postAnswer = async (req: Request, res: Response) => {
  try {
    const { quesNum, score, userId } = req.body;

    const question = await Questions.findOne({ quesNum }).lean();
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const wellbeingAnswer = await WellBeingAnswers.create({
      quesNo: quesNum,
      score,
      user: userId,
    });

    return res.status(201).json(wellbeingAnswer);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
