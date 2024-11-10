import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';

const QuizzesPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    const fetchFunc = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/quizzes", {
          headers: {
            Authorization: token
          }
        });
        const quizs = res.data.quizzes;
        setQuizzes(quizs.reverse());
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchFunc();
  }, [token, navigate]);

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-col items-center min-h-screen px-5 py-10 bg-gray-100">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Available Quizzes</h1>
          <p className="mt-2 text-lg text-gray-600">
            Choose a quiz and put your knowledge to the test!
          </p>
        </section>

        {loading ? ( // Display loading indicator while loading
          <p className="text-lg text-gray-500">Loading quizzes...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="p-6 transition duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
                >
                  <h3 className="mb-2 text-2xl font-semibold text-gray-800">{quiz.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{quiz.description}</p>
                  <p className="mb-2 text-sm text-gray-500">Created by: {quiz.created_by}</p>
                  <p className="mb-4 text-sm text-gray-500">
                    Questions: {quiz.questionCount} | Difficulty: {quiz.difficulty}
                  </p>
                  <button
                    className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={() => handleStartQuiz(quiz._id)}
                  >
                    Start Quiz
                  </button>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-500">No quizzes available at the moment.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default QuizzesPage;
