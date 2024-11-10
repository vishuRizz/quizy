import React from "react";
import Navbar from "../components/Navbar";
import SignupCard from "../components/SignupCard";

function Signup() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-white">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="flex flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:items-start lg:px-20">
          <div className="flex flex-col w-full mt-16 space-y-8 lg:w-1/2">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-4xl font-bold text-purple-700">
                Welcome to Quizy!
              </h1>
              <p className="text-lg text-gray-500">
                Sign in to take fun quizzes, track your progress, and climb the
                leaderboard!
              </p>
            </div>

            <div className="p-8 text-center bg-white rounded-lg shadow-lg lg:text-left">
              <h2 className="mb-4 text-2xl font-semibold text-purple-600">
                Why Join Quizy?
              </h2>
              <p className="mb-4 text-gray-500">
                Unlock personalized quizzes, earn badges, and compete with
                friends. Get smarter, one quiz at a time!
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>Access to exclusive quizzes</li>
                <li>Save your quiz progress</li>
                <li>View your ranking on the leaderboard</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-4 lg:w-1/2">
            <SignupCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
