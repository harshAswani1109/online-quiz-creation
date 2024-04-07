"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const QuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/quizzes/${quizId}/questions`
      );
      setQuiz(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedAnswers = Object.values(selectedAnswers).map(
        (answer) => answer
      );
      console.log(formattedAnswers);
      const response = await axios.post(
        `http://localhost:8080/api/quizzes/${quizId}/submit`,
        {
          answers: formattedAnswers,
        }
      );
      setScore(response.data.marks);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // Optionally, you can reset the quiz or redirect the user here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found!</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">{quiz.title}</h1>
      <p className="text-lg">{quiz.description}</p>
      <form onSubmit={handleSubmit}>
        {quiz.map((question) => (
          <div key={question.question_id} className="mb-4">
            <p>{question.question_text}</p>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question_${question.question_id}`}
                  value={1}
                  checked={selectedAnswers[question.question_id] === 1}
                  onChange={() => handleOptionChange(question.question_id, 1)}
                />
                {question.option1}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question_${question.question_id}`}
                  value={2}
                  checked={selectedAnswers[question.question_id] === 2}
                  onChange={() => handleOptionChange(question.question_id, 2)}
                />
                {question.option2}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question_${question.question_id}`}
                  value={3}
                  checked={selectedAnswers[question.question_id] === 3}
                  onChange={() => handleOptionChange(question.question_id, 3)}
                />
                {question.option3}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question_${question.question_id}`}
                  value={4}
                  checked={selectedAnswers[question.question_id] === 4}
                  onChange={() => handleOptionChange(question.question_id, 4)}
                />
                {question.option4}
              </label>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
        >
          Submit
        </button>
      </form>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-md sm:w-96">
            <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
            <p className="text-lg">Your score: {score}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
