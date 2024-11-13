import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import Loader from "../components/Loading";

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
            Authorization: token,
          },
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

  const handleStartQuiz = (quizId, attempted) => {
    if (attempted) {
      navigate(`/score/${quizId}`);
    } else {
      navigate(`/quiz/${quizId}`);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex min-h-screen px-5 py-10 bg-gray-50">
        
        <section className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800">Guidelines</h2>
          <ul className="mt-4 space-y-3 text-gray-600 list-disc list-inside">
            <li>Ensure you are logged in before starting a quiz.</li>
            <li>Each quiz has a time limit; complete it within the duration.</li>
            <li>Click "View Score" to check your results for attempted quizzes.</li>
            <li>Unattempted quizzes will allow you to start fresh.</li>
            <li>Review your answers carefully before submitting the quiz.</li>
          </ul>
        </section>

        {/* Available Quizzes Section */}
        <section className="w-2/3 h-[80vh] px-16 overflow-y-auto">
          <div className="max-w-full">
            <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
              Available Quizzes
            </h1>
            {loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col gap-6">
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => (
                    <div
                      key={quiz._id}
                      className="flex items-center px-4 py-3 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
                    >
                      {/* Icon Section */}
                      <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-lg shrink-0">
                        <FaUserAlt className="text-3xl text-blue-600" />
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col flex-grow px-6 space-y-2">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {quiz.description}
                        </p>
                        <div className="text-sm text-gray-500">
                          <p>
                            <strong>Category:</strong> {quiz.category || "General"}
                          </p>
                          <p>
                            <strong>Questions:</strong> {quiz.questionCount}
                          </p>
                          <p>
                            <strong>Difficulty:</strong> {quiz.difficulty}
                          </p>
                        </div>
                      </div>

                      {/* Action Section */}
                      <div className="flex items-center">
                        <button
                          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                          onClick={() =>
                            handleStartQuiz(quiz._id, quiz.attempted)
                          }
                        >
                          {quiz.attempted ? "View Score" : "Start Quiz"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-gray-500">
                    No quizzes available at the moment.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default QuizzesPage;
