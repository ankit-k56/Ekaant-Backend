import User from "../models/User.js";
import Rating from "../models/Rating.js";

import { Request, Response } from "express";

export const rateProduct = async (req: Request, res: Response) => {
  // Rate the product
  try {
    const { rating, feedback, userId } = req.body;
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await Rating.create({ rating, feedback, userId });
    return res.status(201).json({ rmessage: "Rating added successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
