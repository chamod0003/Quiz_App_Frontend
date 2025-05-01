import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Layout from "./pages/Layout";
import Result from "./pages/Results";
import Home from "./pages/Home";
import Quiz_c from "./pages/Quiz_c";
import Quiz_cResults from "./pages/Quiz_cResults";
import MyResults from "./pages/MyResults";
import Quiz_java from "./pages/Quiz_java";
import Results_java from "./pages/Results_java";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Wrap Quiz inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="quiz_c" element={<Quiz_c />} />
          <Route path="quiz_cresults" element={<Quiz_cResults />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="result" element={<Result/>} />
          <Route path="my-results"element={<MyResults/>}/>
          <Route path="quiz_java" element={<Quiz_java/>}/>
          <Route path="quiz_javaresults" element={<Results_java />} />


          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
