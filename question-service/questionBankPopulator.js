import fs from "fs";
import mongoose from "mongoose";
import Question from "./questionModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE_URL;

await mongoose
  .connect(DB, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .then(() => Question.deleteMany())
  .then(() => {
    for (let diff of ["Easy", "Medium", "Hard"]) {
      let files = fs.readdirSync(
        `/Users/euzintan/source/cs3219/question-service/resources/${diff}Questions`
      );

      for (let file of files) {
        console.log(file);
        fs.readFile(
          `/Users/euzintan/source/cs3219/question-service/resources/${diff}Questions/${file}`,
          "utf8",
          (err, data) => {
            Question.create({
              name: file.slice(0, -3),
              difficulty: diff.toUpperCase(),
              question: data,
            });
          }
        );
      }
    }
  });
// .then(() => mongoose.disconnect());

// await Question.deleteMany();
