const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
// MongoDB にローカルで接続する
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

const questionsSchema = new mongoose.Schema({
    questionNo : String,
    questionName : String
});

const answersSchema = new mongoose.Schema({
    questionNo : String,
    answerNo : String,
    answerResult : String
});
const Question = mongoose.model("Questions", questionsSchema);
const Answer = mongoose.model("Answers", answersSchema);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving questions" });
    }
});

app.get("/answers", async (req, res) => {
    try {
        const answers = await Answer.find();
        res.json(answers);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving answers" });
    }
});


app.listen(port, () => {
    console.log("Server started on port ",port);
});