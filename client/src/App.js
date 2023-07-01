import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import "./index.css";
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element = {<Login/>}/>
        <Route exact path="/signup" element = {<Signup/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
