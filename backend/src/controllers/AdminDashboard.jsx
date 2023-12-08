import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageUsers from './Utilities/ManageUsers'; // Import other CRUD components
import ManageVehicles from './Utilities/ManageVehicles';
import ManageDrivers from './Utilities/ManageDrivers';
import ManageBookings from './Utilities/ManageBooking';
import ManagePayment from './Utilities/ManagePayment';

const AdminDashboard = ({ isAdminLoggedIn }) => {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState(null);

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

  const renderComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      {isAdminLoggedIn ? (
        <>
          <h2>Admin Dashboard</h2>
          {/* Add buttons to dynamically render corresponding components */}
          <div>
            <button onClick={() => renderComponent(<ManageUsers />)}>Manage Users</button>
            <button onClick={() => renderComponent(<ManageDrivers />)}>Manage Drivers</button>
            <button onClick={() => renderComponent(<ManageVehicles />)}>Manage Vehicles</button>
            <button onClick={() => renderComponent(<ManageBookings />)}>Manage Bookings</button>
            <button onClick={() => renderComponent(<ManagePayment />)}>Manage Payment</button>
            {/* Add more buttons as needed */}
          </div>

          {/* Render the selected component */}
          {selectedComponent && <div>{selectedComponent}</div>}

          {/* Add a logout button */}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        // Render the login form if the admin is not logged in
        <div>
          <h2>Admin Login</h2>
          {/* Assuming you have a Route set up for "/AdminLogin" in your App.js */}
          <button onClick={() => navigate('/AdminLogin')}>Go to Admin Login</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
