import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../assets/signup.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle confirmation password separately
    if (name === 'confirmPassword') {
      setConfirmPassword(value);

      // Clear the validation error for confirmPassword when the user starts typing
      setErrors({
        ...errors,
        confirmPassword: '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Clear the validation error when the user starts typing
      setErrors({
        ...errors,
        [name]: '',
        confirmPassword: '', // Clear confirmation password error
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.contactNumber.trim()) {
      validationErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{11}$/.test(formData.contactNumber)) {
      validationErrors.contactNumber = 'Invalid contact number format';
    }

    if (confirmPassword !== formData.password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    // If there are validation errors, update the state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
    const response = await axios.post('http://localhost:8081/api/user/signup', formData);

    // Handle the server response
    console.log('Server response:', response.data);

    // Reset the form after successful submission
    setFormData({
      name: '',
      email: '',
      password: '',
      contactNumber: '',
    });
    setConfirmPassword('');
  } catch (error) {
    // Handle specific errors
    if (error.response && error.response.status === 400) {
      const { message, field } = error.response.data;

      // Show a toast notification for the specific error
      if (field === 'email') {
        toast.error(`Email: ${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      } else if (field === 'contactNumber') {
        toast.error(`Contact Number: ${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      } else {
        // If field is not defined, show a generic error message
        toast.error(`Error: ${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    } else {
      // Handle other errors
      console.error('Signup failed:', error.response ? error.response.data.message : 'Unknown error');

      // Show a generic error toast notification
      toast.error('An error occurred. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  }
};

  return (
    <div className={styles['signup-container']}>
      <h2><center>Sign Up</center></h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </label>
        <label>
          Contact Number: <br />
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
        </label>
        <label>
          Email: <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
        <label>
          Password: <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </label>
        <label>
          Confirm Password: <br />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            minLength="6"
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

//setConfirmPassword('');