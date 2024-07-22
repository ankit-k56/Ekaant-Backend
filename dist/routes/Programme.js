import express from "express";
import { postProgramme, getProgrammes, postUserProgramme, } from "../controllers/Programmes.js";
const router = express.Router();
router.post("/", postProgramme);
router.get("/", getProgrammes);
router.post("/user", postUserProgramme);
export default router;
