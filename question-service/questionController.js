import Question from "./questionModel.js";

export const getAllQuestions = async (req, res, next) => {
  const questions = await Question.find();

  return res.status(200).json({
    status: "success",
    data: questions,
  });
};

export const getAllQuestionsByDifficulty = async (req, res, next) => {
  console.log(req.query.difficulty);
  if (!isValidQuestionDifficulty(req.query.difficulty, res)) return;

  const questions = await Question.find()
    .where("difficulty")
    .equals(req.query.difficulty);

  console.log(questions);

  return res.status(200).json({
    status: "success",
    data: questions,
  });
};

export const getQuestionByID = async (req, res, next) => {
  const question = await Question.findById(req.query.id);

  return res.status(200).json({
    status: "success",
    data: question,
  });
};

export const getRandomQuestionByDifficulty = async (req, res, next) => {
  if (!isValidQuestionDifficulty(req.query.difficulty, res)) return;

  const questionsByDifficulty = await Question.find()
    .where("difficulty")
    .equals(req.query.difficulty);

  const randomQuestion = req.query.seed
    ? questionsByDifficulty[Math.floor(req.query.seed % 8)]
    : questionsByDifficulty[
        Math.floor(Math.random() * questionsByDifficulty.length)
      ];

  return res.status(200).json({
    status: "success",
    data: randomQuestion,
  });
};

const isValidQuestionDifficulty = (difficulty, res) => {
  const VALID_DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
  if (difficulty == null || !VALID_DIFFICULTIES.includes(difficulty)) {
    res.status(500).json({
      status:
        "Bad Request: Invalid Difficulty Level. Please provide difficulty of EASY, MEDIUM or HARD",
    });
    return false;
  } else {
    return true;
  }
};
