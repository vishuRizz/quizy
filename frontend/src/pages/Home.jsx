import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-screen text-gray-800 bg-gray-100">
        <section className="py-20 bg-gray-100">
          <div className="container px-6 mx-auto text-center">
            <h1 className="mb-4 text-5xl font-bold text-black">
              Welcome to Quizy
            </h1>
            <p className="mb-8 text-lg text-black">
              Your go-to platform to test knowledge, challenge friends, and
              climb the leaderboard!
            </p>
            <div>
              <a
                onClick={()=>{
                  navigate("/register")
                }}
                className="px-6 py-3 mr-4 font-semibold text-blue-600 no-underline bg-white rounded-lg cursor-pointer hover:bg-blue-400 hover:text-black"
              >
                Get Started
              </a>
              <a
                onClick={()=>{
                  navigate("/all-quizes")
                }}
                className="px-6 py-3 font-semibold text-white no-underline bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-700 hover:text-black"
              >
                Take a Quiz
              </a>
            </div>
          </div>
        </section>

        <section className="container px-6 py-20 mx-auto">
          <h2 className="mb-10 text-4xl font-bold text-center">What We Do</h2>
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="p-8 transition-transform duration-200 ease-in-out transform bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:scale-105">
              <div className="mb-4 text-4xl text-blue-600">📚</div>
              <h3 className="mb-2 text-2xl font-bold">Engaging Quizzes</h3>
              <p className="text-gray-600">
                Take quizzes on various topics to test your knowledge, sharpen
                your skills, and learn in a fun way.
              </p>
            </div>

            <div className="p-8 transition-transform duration-200 ease-in-out transform bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:scale-105">
              <div className="mb-4 text-4xl text-blue-600">🏆</div>
              <h3 className="mb-2 text-2xl font-bold">Leaderboard</h3>
              <p className="text-gray-600">
                Compete with others and track your progress. Climb the
                leaderboard and show off your achievements!
              </p>
            </div>

            <div className="p-8 transition-transform duration-200 ease-in-out transform bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:scale-105">
              <div className="mb-4 text-4xl text-blue-600">💡</div>
              <h3 className="mb-2 text-2xl font-bold">Track Your Progress</h3>
              <p className="text-gray-600">
                Keep track of the quizzes you've taken, your scores, and see how
                you improve over time.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 text-center bg-gray-100">
          <h2 className="mb-4 text-4xl font-bold text-black">
            Ready to Test Your Knowledge?
          </h2>
          <p className="mb-8 text-lg text-blue-6 00">
            Join Quizy today and dive into the world of fun and learning!
          </p>
          <a
            href="/signup"
            className="px-8 py-4 font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-200"
          >
            Sign Up Now
          </a>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
