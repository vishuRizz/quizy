import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';

const QuizzesPage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [quizzes, setQuizzes] = useState([])
  useEffect(() => {
    if (!token) {
      alert("please login first")
      navigate("/login");
    }
    const fetchFunc = async() => {
      const res = await axios.get("http://127.0.0.1:5000/quizzes", {
        headers: {
          Authorization: token
        }
      })
      const quizs = res.data.quizzes
      setQuizzes(quizs.reverse()) 
    }
    fetchFunc()
  }, [])
  // const quizzes = [
  //   {
  //     _id: '1',
  //     title: 'Python Quiz',
  //     description: 'A quiz covering various general knowledge topics.',
  //     created_by: "Ananya ma'am",
  //     questionCount: 10,
  //     difficulty: 'Medium'
  //   },
  //   {
  //     _id: '2',
  //     title: 'JavaScript Basics',
  //     description: 'Test your knowledge on JavaScript basics and syntax.',
  //     created_by: "Ravi sir",
  //     questionCount: 15,
  //     difficulty: 'Easy'
  //   },
  //   {
  //     _id: '3',
  //     title: 'HTML & CSS Basics',
  //     description: 'An introductory quiz on HTML and CSS fundamentals.',
  //     created_by: "Sara ma'am",
  //     questionCount: 8,
  //     difficulty: 'Easy'
  //   },
  //   {
  //     _id: '3',
  //     title: 'HTML & CSS Basics',
  //     description: 'An introductory quiz on HTML and CSS fundamentals.',
  //     created_by: "Sara ma'am",
  //     questionCount: 8,
  //     difficulty: 'Easy'
  //   },
  //   {
  //     _id: '3',
  //     title: 'HTML & CSS Basics',
  //     description: 'An introductory quiz on HTML and CSS fundamentals.',
  //     created_by: "Sara ma'am",
  //     questionCount: 8,
  //     difficulty: 'Easy'
  //   },
  //   {
  //     _id: '3',
  //     title: 'HTML & CSS Basics',
  //     description: 'An introductory quiz on HTML and CSS fundamentals.',
  //     created_by: "Sara ma'am",
  //     questionCount: 8,
  //     difficulty: 'Easy'
  //   },
  //   {
  //     _id: '3',
  //     title: 'HTML & CSS Basics',
  //     description: 'An introductory quiz on HTML and CSS fundamentals.',
  //     created_by: "Sara ma'am",
  //     questionCount: 8,
  //     difficulty: 'Easy'
  //   },
  // ];

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
    </div>
    </>
  );
};

const handleStartQuiz = (quizId) => {
  // Redirect or navigate to the quiz page with the selected quiz ID
  window.location.href = `/quiz/${quizId}`;
};

export default QuizzesPage;
