import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  console.log(questions)

  useEffect(() => {
    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/questions/${quizId}`, {
          headers: {
            Authorization: token
          }
        });
        setQuestions(res.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId, token, navigate]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correct_option_index) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <p className="text-lg text-gray-500">Loading questions...</p>;

  return (
    <>
    <div className='sticky top-0 z-50'>
        <Navbar/>
    </div>
    <div className="flex flex-col items-center min-h-screen px-5 py-10 bg-gradient-to-b from-blue-50 to-gray-100">
      <h1 className="mb-5 text-4xl font-bold text-blue-800">Quiz</h1>

      {score === null ? (
        <>
          <div className="w-full max-w-xl p-6 mb-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-blue-700">
              {questions[currentQuestionIndex].question_text}
            </h2>
            <div className="grid gap-3">
              {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                <label 
                  key={optionIndex} 
                  className="flex items-center p-2 transition rounded-md cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={optionIndex}
                    checked={selectedOptions[currentQuestionIndex] === optionIndex}
                    onChange={() => handleOptionChange(currentQuestionIndex, optionIndex)}
                    className="mr-3 text-blue-600 focus:ring-0"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between w-full max-w-xl mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 font-semibold text-white  rounded-lg hover:bg-blue-400 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Your Score: {score} / {questions.length}</h2>
          <button
            onClick={() => navigate('/all-quizes')}
            className="px-6 py-3 mt-5 font-semibold text-white transition transform bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Quiz;
