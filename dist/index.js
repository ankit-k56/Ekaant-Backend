import express from "express";
import connectToDb from "./db/ConnectToDb.js";
import "dotenv/config";
import authRouter from "./routes/AuthRouter.js";
import moodsRouter from "./routes/MoodsRouter.js";
import authenticate from "./middleware/authentication.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname + "/../public")));
app.use("/auth", authRouter);
app.use("/moods", authenticate, moodsRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Ekaant API");
});
app.listen(process.env.PORT, () => {
    try {
        connectToDb(process.env.MONGO_URL);
        console.log(`Listening on port ${process.env.PORT}`);
    }
    catch (error) {
        console.log("Error connecting to the database: ", error);
    }
});
