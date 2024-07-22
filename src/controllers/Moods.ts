import UserMoods from "../models/UserMoods.js";
import User from "../models/User.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
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
    if (!date || !userId) {
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

    const today = new Date();
    const dayOfWeek = today.getDay();

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    lastMonday.setHours(0, 0, 0, 0);

    const thisSaturday = new Date(lastMonday);
    thisSaturday.setDate(lastMonday.getDate() + 6);
    thisSaturday.setHours(23, 59, 59, 999);

    // Fetch moods within the calculated date range
    const userMoods = await UserMoods.find({
      userId,
      date: { $gte: lastMonday, $lt: thisSaturday },
    }).sort({ date: 1 });

    res.status(200).json({ userMoods });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
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

export const updateFirstTime = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const user: any = await User.findByIdAndUpdate(
      userId,
      { firstTime: false },
      { new: true }
    );
    return res.status(200).json({ message: "First time updated successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const fetchAverageMoods = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const currentYear = new Date().getFullYear();

    const averageMoods = await UserMoods.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          averageMood: { $avg: "$mood" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format the response to include month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedResponse = averageMoods.map((item) => ({
      month: monthNames[item._id - 1],
      averageMood: item.averageMood.toFixed(2), // format to 2 decimal places
    }));

    res.status(200).json(formattedResponse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
