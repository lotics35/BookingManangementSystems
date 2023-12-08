import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = ({ isAdminLoggedIn }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    navigate('/AdminLogin');
  };

  useEffect(() => {
    // Redirect to AdminLogin if not logged in
    if (!isAdminLoggedIn) {
      navigate('/AdminLogin');
    }
  }, [isAdminLoggedIn, navigate]);

  return (
    <div>
      {isAdminLoggedIn ? (
        <>
          <h2>Admin Dashboard</h2>
          {/* Add navigation links to different admin functionalities */}
          <nav>
            <ul>
              <li><Link to="/AdminDash/bookings">Manage Bookings</Link></li>
              <li><Link to="/AdminDash/vehicles">Manage Vehicles</Link></li>
              {/* Add more links as needed */}
            </ul>
          </nav>

          {/* Display a summary of bookings or other relevant information */}
          <div>
            <h3>Recent Bookings</h3>
            {/* Display recent bookings */}
          </div>

          {/* Add a logout button */}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        // Render the login form if the admin is not logged in
        <div>
          <h2>Admin Login</h2>
          {/* Assuming you have a Route set up for "/AdminLogin" in your App.js */}
          <Link to="/AdminLogin">Go to Admin Login</Link>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
