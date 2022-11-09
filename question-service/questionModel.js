import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: {
      values: ["EASY", "MEDIUM", "HARD"],
      message: "Question must be categgorised as EASY, MEDIUM OR HARD",
    },
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
