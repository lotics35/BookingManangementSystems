import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/manageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(
    { name: '', email: '', password: '', contactNumber: '' });

  useEffect(() => {
    // Fetch existing users from the backend when the component mounts
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
    axios.post('http://localhost:8081/api/user/signup' , userInfo);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/user/users');
      const data = await response.json();
  
      // Ensure data.users is an array before updating state
      if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error('Invalid user data:', data);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <div>
      <h3>Manage Users</h3>

      {/* Display a table of users */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" 
          value={userInfo.name} onChange={handleChange}/>
        Email:
        <input type="text" name="email" 
          value={userInfo.email} onChange={handleChange}/>
        Password:
        <input type="text" name="password" 
          value={userInfo.password} onChange={handleChange}/>
        Contact Number:
        <input type="text" name="contactNumber" 
          value={userInfo.contactNumber} onChange={handleChange}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
};

export default ManageUsers;
