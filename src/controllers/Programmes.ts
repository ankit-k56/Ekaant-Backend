import { Programme, ProgrammeUserTable } from "../models/ProgrammeModel.js";
import { Request, Response } from "express";

export const postProgramme = async (req: Request, res: Response) => {
  try {
    const { name, date } = req.body;
    const programme = await Programme.create({ name, date });
    return res.status(201).json(programme);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProgrammes = async (req: Request, res: Response) => {
  try {
    const programmes = await Programme.find();
    return res.status(200).json(programmes);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const postUserProgramme = async (req: Request, res: Response) => {
  try {
    const { programmeId, userId } = req.body;
    const userProgramme = await ProgrammeUserTable.create({
      programmeId,
      userId,
    });
    return res.status(201).json(userProgramme);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
