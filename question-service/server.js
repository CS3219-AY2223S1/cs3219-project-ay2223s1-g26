import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import {
  getAllQuestions,
  getAllQuestionsByDifficulty,
  getQuestionByID,
  getRandomQuestionByDifficulty,
} from "./questionController.js";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

let port = process.env.PORT_NUMBER || 3005;

app.listen(port, () => {
  console.log(`Question-service running on port ${port}`);
});

app.get("/questions", getRandomQuestionByDifficulty);
