import User from "../models/User.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/SendMail.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, organisation,phoneNo } = req.body;
    if (!name || !email || !password || !organisation || !phoneNo) {
      return res.status(400).json({ error: "Please enter all fields" });
    }

    const user = await User.create({ name, email, password, organisation, phoneNo });
    const token = user.generateAuthToken();
    sendMail(token, email);
    return res.status(201).json({ user, token });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
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
    if (!user.isEmailVerified) {
      return res.status(400).json({ error: "Please verify your email" });
    }

    const isPsswordMatch = await bcrypt.compare(password, user.password);

    if (!isPsswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = user.generateAuthToken();
    return res.json({ user, token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { _id } = decoded as { _id: string };
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isEmailVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified" });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
    }
  }
};
