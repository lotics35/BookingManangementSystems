// App.js

import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavMenu from './components/navbar';
import Home from './components/Home';
import VehicleList from './components/VehicleList';
import About from './components/About';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin'; 
import AdminDashboard from './components/AdminDashboard';
import Background from './components/background';

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  return (
    <>
      <NavMenu />
      <Background/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/List" element={<VehicleList />} />
          <Route path="/About" element={<About />} />
          <Route path="/Profile" element={<Profile />} />
          {/* Add routes for AdminLogin and AdminDashboard */}
          <Route path="/AdminLogin" element={<AdminLogin onLogin={handleAdminLogin}/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard isAdminLoggedIn={isAdminLoggedIn} onLogin={handleAdminLogin} />}/>
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
};

export default App;
