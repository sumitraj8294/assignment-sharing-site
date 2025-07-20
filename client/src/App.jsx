import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitAssignment from './pages/SubmitAssignment';
import Profile from './pages/Profile';
import AllAssignments from './pages/AllAssignments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<SubmitAssignment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assignments" element={<AllAssignments />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
