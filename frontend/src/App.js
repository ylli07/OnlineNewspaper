import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import World from './pages/World';
import Sports from './pages/Sports';
import Technology from './pages/Technology';
import Login from './pages/Login';
import Signup from './components/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
