"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const QuizzesPage = ({ role }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
  });
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/quizzes");
      console.log(response);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/quizzes/${selectedQuiz.quiz_id}`,
        updateData
      );
      // Refresh quizzes after update
      fetchQuizzes();
      setIsUpdatePopupOpen(false);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/quizzes/${selectedQuiz.quiz_id}`
      );
      // Refresh quizzes after delete
      fetchQuizzes();
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.quiz_id}
            className="p-4 bg-gray-100 rounded-md shadow-md"
          >
            <h2 className="text-lg font-semibold">{quiz.title}</h2>
            <p className="text-sm text-gray-600">{quiz.description}</p>
            {role === "user" ? (
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Attempt
              </button>
            ) : (
              <div className="mt-4 space-x-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setIsUpdatePopupOpen(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setIsDeletePopupOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Update Popup */}
      {isUpdatePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Update Quiz</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={updateData.title}
              onChange={(e) =>
                setUpdateData({ ...updateData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={updateData.description}
              onChange={(e) =>
                setUpdateData({ ...updateData, description: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setIsUpdatePopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {isDeletePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this quiz?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setIsDeletePopupOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
