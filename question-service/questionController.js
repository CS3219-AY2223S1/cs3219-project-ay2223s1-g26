const Question = require("./questionModel");

const getAllQuestions = (req, res, next) => {
    const questions = Question.find();

    return res.status(200).json({
        status: "success",
        data: questions
    })
}

const getAllQuestionsByDifficulty = (req, res, next) => {

    if (!isValidQuestionDifficulty(req.params.difficulty, res)) return;

    const questions = Question.find().where("difficulty").equals(req.params.difficulty);

    return res.status(200).json({
        status: "success",
        data: questions
    })
}

const getQuestionByID = (req, res, next) => {
    const question = await Question.findById(req.params.id);

    return res.status(200).json({
        status: "success",
        data: question
    })
}

const getRandomQuestionByDifficulty = (req, res, next) => {

    if (!isValidQuestionDifficulty(req.params.difficulty, res)) return;

    const questionsByDifficulty = await Question.find().where("difficulty").equals(req.params.difficulty);

    // pick a question at random
    const randomQuestion = questionsByDifficulty[Math.floor(Math.random() * questionsByDifficulty.length)]

    return res.status(200).json({
        status: "success",
        data: randomQuestion
    })
}

const isValidQuestionDifficulty = (difficulty, res) => {
    const VALID_DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
    if (!VALID_DIFFICULTIES.includes(difficulty)) {
        return res.status(500).json({
            status: "bad request",
        })
    } else {
        return true;
    }
}



