import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import "./index.css";
import Signup from './pages/Signup';
import OTP from './pages/OTP';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element = {<Login/>}/>
        <Route exact path="/signup" element = {<Signup/>}/>
        <Route exact path="/otpverify" element = {<OTP/>}/>
        <Route exact path="/Home" element = {<Home/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
