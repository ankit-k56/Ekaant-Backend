import UserMoods from "../models/UserMoods.js";
import User from "../models/User.js";
import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

export const updateBreak = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    const userMood = await UserMoods.findOneAndUpdate(
      {
        userId,
        date: { $eq: currDate },
      },
      { $inc: { breaks: 1 } }
    ).lean();
    if (!userMood) {
      return res.status(404).json({ error: "User mood not found" });
    }
    res.status(200).json({ message: "Break updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createMood = async (req: Request, res: Response) => {
  try {
    const { mood, date, userId } = req.body;
    if (!mood || !date || !userId) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const user = User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let alredyMood = await UserMoods.findOne({ userId, date });
    if (alredyMood) {
      alredyMood.mood = mood;
      alredyMood = await alredyMood.save();
      const dat = alredyMood.date?.toDateString();
      return res.status(200).json({ userMood: alredyMood, dat });
    }
    const userMood = await UserMoods.create({ mood, date, userId });
    const dat = userMood.date?.toDateString();
    return res.status(201).json({ userMood, dat });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
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
export const fetchBreak = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const currDate = new Date().toDateString();

    const userMood = await UserMoods.findOne({
      userId,
      date: currDate,
    }).lean();
    if (!userMood) {
      return res.status(404).json({ error: "User mood not found" });
    }
    return res.status(200).json({ breaks: userMood.breaks });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
