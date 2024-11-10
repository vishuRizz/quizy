import React from "react";
import { useNavigate } from "react-router";
import { IoLogOutOutline } from "react-icons/io5";

function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <nav className="sticky top-0 z-50 text-black shadow-md bg-white/10 backdrop-blur-lg">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="text-2xl font-bold cursor-pointer">
            <div onClick={()=>{
              navigate("/")
            }} className="text-black hover:text-purple-500">
              Quizy
            </div>
          </div>

          <div className="hidden space-x-6 ml-36 md:flex">
            <a
              href="/"
              className="text-lg text-black no-underline hover:text-purple-500"
            >
              Home
            </a>
            <a
              onClick={()=>{
                navigate("/all-quizes")
              }}
              className="text-lg text-black no-underline cursor-pointer hover:text-purple-500"
            >
              Quizzes
            </a>
            <a
              href="/leaderboard"
              className="text-lg text-black no-underline hover:text-purple-500"
            >
              Leaderboard
            </a>
            <a
              href="/about"
              className="text-lg text-black no-underline hover:text-purple-500"
            >
              About
            </a>
          </div>

          <div className="flex space-x-4">
            <a
              href="/login"
              className="px-4 py-2 font-semibold text-purple-700 no-underline bg-white rounded-lg hover:bg-purple-300"
            >
              Login
            </a>
            <div
             onClick={()=>{
              navigate("/register")
             }}
              className="px-4 py-2 font-semibold text-white no-underline bg-blue-500 rounded-lg cursor-pointer hover:text-black hover:bg-blue-900 "
            >
              Sign Up
            </div>
            <div onClick={()=>{
              localStorage.removeItem("token")
              localStorage.removeItem("role")
              alert('you have been logged out of Quizy, have a nice day!')
            }} 
            className="mt-1 cursor-pointer">
              <IoLogOutOutline size={30}/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
