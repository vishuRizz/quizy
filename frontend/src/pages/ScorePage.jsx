import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ScorePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [score, setScore] = useState(null);
  const [submissionTime, setSubmissionTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    const fetchScore = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/quiz/${quizId}/score`, {
          headers: {
            Authorization: token
          }
        });
        setScore(res.data.score);
        setSubmissionTime(res.data.attempted_on);
      } catch (error) {
        console.error("Error fetching score:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [quizId, token, navigate]);

  if (loading) return <p className="text-lg text-gray-500">Loading your score...</p>;

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-col items-center min-h-screen px-5 py-10 bg-gray-50">
        <h1 className="text-4xl font-bold text-blue-800">Quiz Results</h1>
        {score !== null ? (
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Your Score: {score}</h2>
            <p className="text-lg text-gray-600">
              Attempted on: {new Date(submissionTime).toLocaleString()}
            </p>
            <button
              onClick={() => navigate('/all-quizes')}
              className="px-6 py-3 mt-5 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Back to Quizzes
            </button>
          </div>
        ) : (
          <p className="text-lg text-gray-500">Score data not available.</p>
        )}
      </div>
    </>
  );
};

export default ScorePage;
