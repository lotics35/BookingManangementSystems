// AdminDashboard.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const AdminDashboard = () => {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  // Function to set admin login status
  const handleAdminLogin = (loggedIn) => {
    setAdminLoggedIn(loggedIn);
  };

  return (
    <div>
      {isAdminLoggedIn ? (
        <>
          <h2>Admin Dashboard</h2>
          {/* Add navigation links to different admin functionalities */}
          <nav>
            <ul>
              <li><Link to="/admin/bookings">Manage Bookings</Link></li>
              <li><Link to="/admin/vehicles">Manage Vehicles</Link></li>
              {/* Add more links as needed */}
            </ul>
          </nav>

          {/* Display a summary of bookings or other relevant information */}
          <div>
            <h3>Recent Bookings</h3>
            {/* Display recent bookings */}
          </div>
        </>
      ) : (
        // Render the login form if the admin is not logged in
        <AdminLogin onLogin={handleAdminLogin} />
      )}
    </div>
  );
};

export default AdminDashboard;
