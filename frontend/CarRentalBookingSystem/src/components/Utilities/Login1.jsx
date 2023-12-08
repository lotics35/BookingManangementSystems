import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(''); // Assume you get the user type during login

  const history = useHistory();

  const handleLogin = () => {
    // Perform your login logic here
    // After successful login, set the user type and redirect
    setUserType('admin'); // Replace with the actual user type received from authentication

    if (userType === 'admin') {
      history.push('/admin-dashboard');
    } else {
      history.push('/user-dashboard');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      </form>
    </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;