// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate admin credentials
    if (username === 'admin' && password === 'adminpassword') {
      // Call onLogin prop to set the admin status in the parent component
      onLogin();
      console.log('Redirecting to AdminDashboard');
      navigate('/AdminDashboard');
    } else {
      // Display an error message or redirect to an error page
      console.log('Invalid admin credentials');
    }
  };

  return (
    <div className='main'>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
