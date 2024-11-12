import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const QuestionAdd = () => {
  const { quizId } = useParams(); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // start with 4 empty options
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const questionData = {
      question_text: questionText,
      options,
      correct_option_index: correctOptionIndex
    };

    try {
     const res = await axios.post(`http://127.0.0.1:5000/question/${quizId}`, questionData, {
        headers: {
          Authorization: token,
        }
      });
      console.log(res.data);
      alert('Question added successfully!');
      navigate(`/teacher-dashboard`);
    } catch (error) {
      console.error("Error adding question:", error);
      alert('Failed to add question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-10 bg-gradient-to-b from-purple-50 to-gray-100">
      <h1 className="mb-5 text-4xl font-bold text-purple-800">Add a New Question</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Question Text</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your question here"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                className="flex-1 p-2 mr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={`Option ${index + 1}`}
              />
              <input
                type="radio"
                name="correctOption"
                checked={correctOptionIndex === index}
                onChange={() => setCorrectOptionIndex(index)}
                className="w-5 h-5 text-purple-600 focus:ring-purple-500"
              />
              <label className="ml-2 text-gray-600">Correct</label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {loading ? 'Adding Question...' : 'Add Question'}
        </button>
      </form>
    </div>
  );
};

export default QuestionAdd;
