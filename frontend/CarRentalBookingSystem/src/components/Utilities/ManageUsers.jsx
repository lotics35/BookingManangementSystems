import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch existing users from the backend when the component mounts
    fetchUsers();
  }, []);

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
    </div>
  );
};

export default ManageUsers;
