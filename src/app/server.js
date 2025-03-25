const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());

// Load data from JSON file
const dataPath = path.join(__dirname, "MinTheinKha.LatHtaukBayDin.json");
let questions = [];
let answers = [];

try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const jsonData = JSON.parse(rawData);
    questions = jsonData.questions || [];
    answers = jsonData.answers || [];
    console.log("JSON data loaded successfully.");
} catch (error) {
    console.error("Failed to load JSON data:", error);
}

// Health check
app.get("/", (req, res) => {
    res.status(200).json({ success: "Server running" });
});

// Return all questions
app.get("/questions", (req, res) => {
    res.json(questions);
});

// Return answers, optionally filtered by questionNo
app.get("/answers", (req, res) => {
    const { questionNo } = req.query;
    if (questionNo) {
        const filtered = answers.filter(a => String(a.questionNo) === String(questionNo));
        return res.json(filtered);
    }
    res.json(answers);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
