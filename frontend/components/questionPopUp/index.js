import React, { useState } from "react";
import axios from "axios";

const ViewQuestionsPopup = ({
  quizId,
  questions,
  setIsViewQuestionsPopupOpen,
}) => {
  const [editedQuestions, setEditedQuestions] = useState([...questions]);
  const handleEditQuestion = async (questionId) => {
    try {
      const editedQuestion = editedQuestions.find(
        (question) => question.question_id === questionId
      );

      await axios.put(
        `http://localhost:8080/api/quizzes/${quizId}/questions/${questionId}`,
        editedQuestion
      );

      setIsViewQuestionsPopupOpen(false);
    } catch (error) {
      console.error("Error editing question:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    setEditedQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index][field] = value;
      return updatedQuestions;
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-1/2">
        <h2 className="text-lg font-bold mb-4">Questions</h2>
        <div className="overflow-y-auto max-h-96">
          {editedQuestions.map((question, index) => (
            <div key={question.question_id} className="mb-4 border-b pb-4">
              <h3 className="text-lg font-semibold">
                Question {index + 1}:
                <input
                  type="text"
                  value={question.question_text}
                  onChange={(e) =>
                    handleInputChange(index, "question_text", e.target.value)
                  }
                  className="w-96 ml-4"
                />
              </h3>
              <ul className="mt-2">
                <li>
                  <span className="mr-2 font-semibold">1:</span>
                  <input
                    type="text"
                    value={question.option1}
                    onChange={(e) =>
                      handleInputChange(index, "option1", e.target.value)
                    }
                  />
                </li>
                <li>
                  <span className="mr-2 font-semibold">2:</span>
                  <input
                    type="text"
                    value={question.option2}
                    onChange={(e) =>
                      handleInputChange(index, "option2", e.target.value)
                    }
                  />
                </li>
                <li>
                  <span className="mr-2 font-semibold">3:</span>
                  <input
                    type="text"
                    value={question.option3}
                    onChange={(e) =>
                      handleInputChange(index, "option3", e.target.value)
                    }
                  />
                </li>
                <li>
                  <span className="mr-2 font-semibold">4:</span>
                  <input
                    type="text"
                    value={question.option4}
                    onChange={(e) =>
                      handleInputChange(index, "option4", e.target.value)
                    }
                  />
                </li>
              </ul>
              <div className="w-full flex justify-between items-center ">
                <p className="text-sm text-purple-500 mt-2">
                  Correct Option:
                  <input
                    type="number"
                    value={question.correct_option}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "correct_option",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </p>
                <button
                  onClick={() => handleEditQuestion(question.question_id)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 mr-4"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4 gap-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 "
            onClick={() => setIsViewQuestionsPopupOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionsPopup;
