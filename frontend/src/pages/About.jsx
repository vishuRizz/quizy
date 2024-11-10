import React from 'react';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  return (
    <>
    <div className='sticky top-0 z-50'>
      <Navbar />
    </div>
    <div className="flex flex-col items-center px-5 py-10 bg-gray-100">
      
      {/* Hero Section */}
      <section className="max-w-3xl p-8 mb-10 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to Quizy</h1>
        <p className="text-lg text-gray-600">
          Where learning meets engagement. Quizy makes education interactive, helping students and teachers create, take, and track quizzes effortlessly.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl p-8 mb-10 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">What is Quizy?</h2>
        <p className="text-base text-gray-600">
          Quizy is a modern quiz platform designed to enhance learning through easy-to-create quizzes. Teachers can add questions, view student results, and gain insights—all in one place. Students can test their knowledge, track scores, and continuously improve.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Why Quizy?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Benefit Card: For Teachers */}
          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <h3 className="mb-2 text-2xl font-bold text-gray-800">For Teachers</h3>
            <p className="text-gray-600">
              Create quizzes quickly, manage question banks, and gain insights into student performance. Quizy helps you save time and focus on teaching.
            </p>
          </div>
          
          {/* Benefit Card: For Students */}
          <div className="p-6 rounded-lg shadow-md bg-gray-50">
            <h3 className="mb-2 text-2xl font-bold text-gray-800">For Students</h3>
            <p className="text-gray-600">
              Take quizzes to track your progress, get instant feedback, and stay motivated. Quizy turns learning into an enjoyable, interactive experience.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutPage;
