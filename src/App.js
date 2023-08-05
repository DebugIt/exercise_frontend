import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import UpdateExercise from "./components/UpdateExercise";
import Exercises from "./components/Exercises";
import Create from "./components/Create";
import User from "./components/User";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Exercises />}/>
          <Route path="/update/:id" element={<UpdateExercise />}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/user" element={<User />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
