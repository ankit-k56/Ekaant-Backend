import express from "express";
import connectToDb from "./db/ConnectToDb.js";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  try {
    connectToDb(process.env.MONGO_URL as string);
    console.log("Listening on port 8080");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
});
