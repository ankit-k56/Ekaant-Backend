import User from "../models/User.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, organisation } = req.body;
    if (!name || !email || !password || !organisation) {
      return res.status(400).json({ error: "Please enter all fields" });
    }

    const user = await User.create({ name, email, password, organisation });
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter all fields" });
    }

    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPsswordMatch = await bcrypt.compare(password, user.password);
    if (!isPsswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
