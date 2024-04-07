"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateQuizPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateQuiz = async () => {
    try {
      if (!title || !description) {
        console.error("Title and description are required");
        return;
      }

      const response = await axios.post("http://localhost:8080/api/quizzes", {
        title,
        description,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateQuiz();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizPage;
