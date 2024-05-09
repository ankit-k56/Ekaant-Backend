import express from "express";
import connectToDb from "./db/ConnectToDb.js";
import "dotenv/config";
import authRouter from "./routes/AuthRouter.js";
import moodsRouter from "./routes/MoodsRouter.js";
import authenticate from "./middleware/authentication.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/moods", authenticate, moodsRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Ekaant API");
});
app.listen(8080, () => {
    try {
        connectToDb(process.env.MONGO_URL);
        console.log("Listening on port 8080");
    }
    catch (error) {
        console.log("Error connecting to the database: ", error);
    }
});
