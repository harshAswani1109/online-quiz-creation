// components/AddQuestionPopup.js
import React, { useState } from "react";
import axios from "axios";

const AddQuestionPopup = ({
  quizId,
  setIsAddQuestionsPopupOpen,
  fetchQuizzes,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(1);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/quizzes/${quizId}/questions`,
        {
          question_text: questionText,
          option1: options[0],
          option2: options[1],
          option3: options[2],
          option4: options[3],
          correct_option: correctOption,
        }
      );
      setIsAddQuestionsPopupOpen(false);
      fetchQuizzes();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Add Question</h2>
        <form onSubmit={handleAddQuestion}>
          <div className="mb-4">
            <label htmlFor="questionText" className="block font-semibold mb-2">
              Question Text
            </label>
            <input
              type="text"
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="sm:grid-cols-2 grid gap-6">
            {options.map((option, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={`option${index + 1}`}
                  className="block font-semibold mb-2"
                >
                  Option {index + 1}
                </label>
                <input
                  type="text"
                  id={`option${index + 1}`}
                  value={options[index]}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            ))}
          </div>
          <div className="mb-8">
            <label htmlFor="correctOption" className="block font-semibold mb-2">
              Correct Option
            </label>
            <select
              id="correctOption"
              value={correctOption}
              onChange={(e) => setCorrectOption(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              required
            >
              {options.map((_, index) => (
                <option key={index} value={index + 1}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionPopup;
