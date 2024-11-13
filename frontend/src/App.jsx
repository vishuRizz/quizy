import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Quizes from "./pages/Quizes";
import StudentDash from "./pages/StudentDash";
import TeacherDash from "./pages/TeacherDash";
import Quiz from "./pages/Quiz";
import QuestionAdd from "./pages/QuestonAdd";
import ScorePage from "./pages/ScorePage";

function App() {

  return (
    <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Signin/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/student-dashboard" element={<StudentDash/>} />
    <Route path="/teacher-dashboard" element={<TeacherDash/>} />
    <Route path="/all-quizes" element={<Quizes/>} />
    <Route path="/quiz/:quizId" element={<Quiz/>} />
    <Route path="/question-add/:quizId" element={<QuestionAdd/>} />
    <Route path="/score/:quizId" element={<ScorePage/>} />
  </Routes>
    </>
  )
}

export default App
