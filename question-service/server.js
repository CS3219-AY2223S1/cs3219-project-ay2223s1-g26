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
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

let port = process.env.PORT_NUMBER || 3005;

app.listen(port, () => {
  console.log(`Question-service running on port ${port}`);
});

app.get("/questions", getRandomQuestionByDifficulty);
