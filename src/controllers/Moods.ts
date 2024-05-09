import UserMoods from "../models/UserMoods.js";
import { Request, Response } from "express";
export const updateBreak = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userMood = await UserMoods.findById(id);
    if (!userMood) {
      return res.status(404).json({ error: "User mood not found" });
    }

    await UserMoods.updateOne({ _id: id }, { breaks: userMood.breaks + 1 });
    res.status(200).json({ message: "Break updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createMood = async (req: Request, res: Response) => {
  try {
    const { mood, date, breaks, userId } = req.body;
    if (!mood || !date || !breaks || !userId) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const userMood = await UserMoods.create({ mood, date, breaks, userId });
    res.status(201).json({ userMood });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchMoods = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const userMoods = await UserMoods.find({
      userId,
      date: { $gte: oneWeekAgo },
    });

    res.status(200).json({ userMoods });
  } catch (error) {}
};
