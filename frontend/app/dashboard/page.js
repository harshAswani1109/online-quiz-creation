"use client";
// pages/quizzes.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import UpdatePopup from "@/components/upDatePopUp";
import DeletePopup from "@/components/deletePopUp";
import ViewQuestionsPopup from "@/components/questionPopUp";
import Link from "next/link";
import AddQuestionPopup from "@/components/addQuestionPopUp";

const QuizzesPage = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
  });
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewQuestionsPopupOpen, setIsViewQuestionsPopupOpen] =
    useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [isAddQuestionsPopupOpen, setIsAddQuestionsPopupOpen] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/quizzes");
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
      fetchQuizzes();
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleViewQuestions = async (quizId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/quizzes/${quizId}/questions`
      );
      setQuestions(response.data);
      setIsViewQuestionsPopupOpen(true);
      setSelectedQuizId(quizId); // Store the selected quiz ID
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleStartTest = (quizId) => {
    router.push(`/dashboard/${quizId}`);
  };

  return (
    <div className="container mx-auto p-8 w-full">
      <h1 className="text-3xl font-bold mb-8">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {quizzes.map((quiz) => (
          <div
            key={quiz.quiz_id}
            className="relative bg-white rounded-lg overflow-hidden shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="bg-gradient-to-b from-purple-500 to-indigo-600 h-20 flex flex-col items-start px-6 gap-y-1 justify-center">
              <h2 className="text-xl font-semibold text-white">{quiz.title}</h2>
              <p className="text-sm ont-semibold text-white">
                {quiz.description}
              </p>
            </div>
            <div className="p-4">
              {role === "admin" && (
                <div className="flex flex-col md:flex-row md:justify-start">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-green-600 transition duration-300"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setIsUpdatePopupOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-red-600 transition duration-300"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setIsDeletePopupOpen(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-purple-600 transition duration-300"
                    onClick={() => handleViewQuestions(quiz.quiz_id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => {
                      setSelectedQuizId(quiz.quiz_id);
                      setIsAddQuestionsPopupOpen(true);
                    }}
                  >
                    Add Que
                  </button>
                </div>
              )}
              {role === "user" && (
                <button
                  className="bg-purple-500 text-white px-4 py-2 rounded-md w-full hover:bg-purple-600 transition duration-300"
                  onClick={() => handleStartTest(quiz.quiz_id)}
                >
                  Start Test
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {role === "admin" && (
        <div className="fixed bottom-8 right-12">
          <Link href={"/dashboard/admin"}>
            <button
              type="button"
              className="text-white w-52 h-12 text-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            >
              Create New
            </button>
          </Link>
        </div>
      )}

      {isUpdatePopupOpen && (
        <UpdatePopup
          updateData={updateData}
          setUpdateData={setUpdateData}
          handleUpdate={handleUpdate}
          setIsUpdatePopupOpen={setIsUpdatePopupOpen}
        />
      )}

      {isDeletePopupOpen && (
        <DeletePopup
          handleDelete={handleDelete}
          setIsDeletePopupOpen={setIsDeletePopupOpen}
        />
      )}

      {isViewQuestionsPopupOpen && (
        <ViewQuestionsPopup
          questions={questions}
          setIsViewQuestionsPopupOpen={setIsViewQuestionsPopupOpen}
          quizId={selectedQuizId}
        />
      )}

      {isAddQuestionsPopupOpen && (
        <AddQuestionPopup
          quizId={selectedQuizId}
          setIsAddQuestionsPopupOpen={setIsAddQuestionsPopupOpen}
          fetchQuizzes={fetchQuizzes}
        />
      )}
    </div>
  );
};

export default QuizzesPage;
