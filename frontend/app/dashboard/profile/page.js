import React from "react";

const ProfilePage = () => {
  // Sample data for the profile
  const student = {
    name: "Harsh Aswani",
    registrationNumber: "RA2111003011860",
    quizzes: [
      { id: 1, title: "DBMS CT1", marks: "9/10" },
      { id: 2, title: "DBMS CT2", marks: "12/15" },
      { id: 3, title: "DBMS CT3", marks: "4/5" },
    ],
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="px-6 py-8 sm:px-10 bg-purple-500">
            <h1 className="text-3xl font-semibold text-white mb-2">
              {student.name}
            </h1>
            <p className="text-lg text-white">
              Registration Number: {student.registrationNumber}
            </p>
          </div>

          {/* Quizzes Section */}
          <div className="px-6 py-8 sm:px-10">
            <h2 className="text-2xl font-semibold mb-4">Quizzes Attempted</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {student.quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                    <p className="text-gray-600 ">Marks: {quiz.marks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
