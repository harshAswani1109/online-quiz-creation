const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
// const Student = require("./Student");
// const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();
var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqLogger);
// app.use(express.static(path.join(__dirname)));

// let students = []; //pseudo database not fo real
function reqLogger(req, res, next) {
  console.log(`${req.method}: ${req.url}`);
  next();
}

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  return res.json("From Backend API");
});

// my sql sb connected
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.KEY,
  database: process.env.DATABASE,
});

//get quiz
app.get("/api/quizzes", (req, res) => {
  const sql = "SELECT * FROM quizzes";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error fetching data from database" });
    }
    return res.status(200).json(result);
  });
});

//get quiz questions
app.get("/api/quizzes/:quizId/questions", (req, res) => {
  const { quizId } = req.params;

  // Check if the quizId is a valid number
  if (isNaN(quizId)) {
    return res.status(400).json({ error: "Invalid quiz ID" });
  }

  // Query to fetch all questions for the specified quizId
  const sql = "SELECT * FROM questions WHERE quiz_id = ?";

  db.query(sql, [quizId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error fetching questions from database" });
    }

    return res.status(200).json(result);
  });
});

//post quiz
app.post("/api/quizzes", (req, res) => {
  const { title, description } = req.body;

  const sql = "INSERT INTO quizzes (title, description) VALUES (?, ?)";
  const values = [title, description];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error inserting data into database" });
    }
    return res.status(201).json({ message: "Quiz created successfully" });
  });
});
//post questions
// POST request to create a new question for a quiz
app.post("/api/quizzes/:quizId/questions", (req, res) => {
  const { quizId } = req.params;
  const { question_text, option1, option2, option3, option4, correct_option } =
    req.body;

  // Check if the quizId is a valid number
  if (isNaN(quizId)) {
    return res.status(400).json({ error: "Invalid quiz ID" });
  }

  // Check if the quiz with the provided quizId exists
  const quizQuery = "SELECT * FROM quizzes WHERE quiz_id = ?";
  db.query(quizQuery, [quizId], (quizErr, quizResult) => {
    if (quizErr) {
      console.error(quizErr);
      return res.status(500).json({ error: "Error checking quiz existence" });
    }

    if (quizResult.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Quiz exists, proceed to insert the question
    const insertQuery =
      "INSERT INTO questions (quiz_id, question_text, option1, option2, option3, option4, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      quizId,
      question_text,
      option1,
      option2,
      option3,
      option4,
      correct_option,
    ];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error inserting data into database" });
      }
      return res.status(201).json({ message: "Question created successfully" });
    });
  });
});

//answers
// POST request to submit answers and calculate marks
app.post("/api/quizzes/:quizId/submit", (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  // Check if the quizId is a valid number
  if (isNaN(quizId)) {
    return res.status(400).json({ error: "Invalid quiz ID" });
  }

  // Fetch correct answers for the quiz from the database
  const fetchCorrectAnswersQuery =
    "SELECT correct_option FROM questions WHERE quiz_id = ?";
  db.query(fetchCorrectAnswersQuery, [quizId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error fetching correct answers from database" });
    }

    // Calculate marks based on user's answers and correct answers
    let marks = 0;
    for (let i = 0; i < result.length; i++) {
      const correctOption = result[i].correct_option;
      const userAnswer = answers[i]; // Assuming answers are provided in the same order as questions

      if (userAnswer === correctOption) {
        marks++;
      }
    }

    return res.status(200).json({ marks });
  });
});

// DELETE request to delete a quiz
app.delete("/api/quizzes/:quizId", (req, res) => {
  const { quizId } = req.params;

  // Check if the quizId is a valid number
  if (isNaN(quizId)) {
    return res.status(400).json({ error: "Invalid quiz ID" });
  }

  // Query to delete the quiz from the database
  const deleteQuery = "DELETE FROM quizzes WHERE quiz_id = ?";

  db.query(deleteQuery, [quizId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error deleting quiz from database" });
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    return res.status(200).json({ message: "Quiz deleted successfully" });
  });
});

// DELETE request to delete a question
app.delete("/api/questions/:questionId", (req, res) => {
  const { questionId } = req.params;

  // Check if the questionId is a valid number
  if (isNaN(questionId)) {
    return res.status(400).json({ error: "Invalid question ID" });
  }

  // Query to delete the question from the database
  const deleteQuery = "DELETE FROM questions WHERE question_id = ?";

  db.query(deleteQuery, [questionId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error deleting question from database" });
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    return res.status(200).json({ message: "Question deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
