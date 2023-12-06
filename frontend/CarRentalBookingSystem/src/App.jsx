// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Utilities/Navbar';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin'; 
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Profile" element={<Profile />} />
          {/* Add routes for AdminLogin and AdminDashboard */}
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminDash" element={<AdminDashboard />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
};

export default App;
