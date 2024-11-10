import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa'; // Importing user icon
import Loader from '../components/Loading';

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
      <div className="flex flex-col items-center min-h-screen px-5 py-10 bg-gray-50">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Available Quizzes</h1>
          <p className="mt-2 text-lg text-gray-600">
            Choose a quiz and put your knowledge to the test!
          </p>
        </section>

        {loading ? ( 
          <Loader/>
        ) : (
          <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="flex flex-col items-start w-full max-w-3xl p-10 text-gray-800 transition-transform duration-300 transform bg-gray-100 shadow-lg rounded-2xl hover:scale-105"
                >
                  <div className="flex items-center mb-6 space-x-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
                      <FaUserAlt className="text-2xl text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{quiz.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">Category: {quiz.category || "General"}</p>
                    </div>
                  </div>
                  <p className="mb-6 leading-relaxed text-gray-600">{quiz.description}</p>
                  
                  <div className="mb-6 text-sm text-gray-500">
                    <p><strong>Created by:</strong> {quiz.created_by}</p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Questions:</strong> {quiz.questionCount} | <strong>Difficulty:</strong> {quiz.difficulty}</p>
                  </div>
                  
                  <button
                    className="w-full py-3 mt-auto font-semibold text-white transition duration-200 bg-blue-600 rounded-full hover:bg-blue-700"
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
