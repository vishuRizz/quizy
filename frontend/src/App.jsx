import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Quizes from "./pages/Quizes";

function App() {

  return (
    <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Signin/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/student-dashboard" element={<About/>} />
    <Route path="/teacher-dashboard" element={<About/>} />
    <Route path="/all-quizes" element={<Quizes/>} />
  </Routes>
    </>
  )
}

export default App
