import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styles from '../../assets/login.module.css';
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Update variable name
  const navigate = useNavigate();
  
  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000, // Adjust as needed
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8081/api/user/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const { userId } = response.data;

        // Store user ID in localStorage
        console.log('Received userId:', userId);
        localStorage.setItem('userId', userId);

        setUserId(userId); // Update state variable name
        setLoggedIn(true);

        // Redirect to Profile after successful login
        navigate('/Profile');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        const { status, data } = error.response;
        if (status === 401) {
          const { message, field } = data;
          setErrors({ [field]: message });
          notifyError(`Login failed: ${message}`);
        } else {
          console.error('Error during login:', error);
        }
      } else {
        console.error('Error:', error.message);
      }

      setFormData({
        email: '',
        password: '',
      });
    }
  };

  if (loggedIn) {
    // Pass user ID to the Profile component
    console.log('Redirecting to Profile with userId:', userId);
    return <Profile userId={userId} />;
  }

  return (
    <div className={styles['login-container']}>
      <h2>
        <center>Login</center>
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password: <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
