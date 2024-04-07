import React from "react";

const ViewQuestionsPopup = ({ questions, setIsViewQuestionsPopupOpen }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-1/2">
        <h2 className="text-lg font-bold mb-4">Questions</h2>
        <div className="overflow-y-auto max-h-96">
          {questions.map((question, index) => (
            <div key={question.question_id} className="mb-4 border-b pb-4">
              <h3 className="text-lg font-semibold">
                Question {index + 1}: {question.question_text}
              </h3>
              <ul className="mt-2">
                <li>
                  <span className="font-semibold">1:</span> {question.option1}
                </li>
                <li>
                  <span className="font-semibold">2:</span> {question.option2}
                </li>
                <li>
                  <span className="font-semibold">3:</span> {question.option3}
                </li>
                <li>
                  <span className="font-semibold">4:</span> {question.option4}
                </li>
              </ul>
              <p className="text-sm text-purple-500 mt-2">
                Correct Option: {question.correct_option}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
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
