import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/editprofile.css';

const EditProfile = ({ onClose }) => {
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    // Load the userId from localStorage
    const userId = localStorage.getItem('userId');

    // Fetch user details using the userId
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/user/profile/${userId}`);

        if (response.status === 200) {
          setUpdatedUser(response.data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Get the userId from localStorage
      const userId = localStorage.getItem('userId');
      console.log('User ID from localStorage:', userId);
  
      // Check if necessary properties are defined
      if (!userId || !updatedUser.name || !updatedUser.email || !updatedUser.contactNumber) {
        console.error('Some user details are missing');
        return;
      }
  
      // Make a PUT request to update user details
      const response = await axios.put(`http://localhost:8081/api/user/profile/${userId}`, {
        name: updatedUser.name,
        email: updatedUser.email,
        contactNumber: updatedUser.contactNumber,
      });
  
      if (response.status === 200) {
        console.log('User details updated successfully');
        onClose();
      } else {
        console.error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  if (!updatedUser) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="edit-profile-container">
      <h1>Edit Contact Details</h1>
      <label className="edit-profile-label">
        Name:
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleInputChange}
          className="edit-profile-input"
        />
      </label>
      <label className="edit-profile-label">
        Email:
        <input
          type="email"
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
          className="edit-profile-input"
        />
      </label>
      <label className="edit-profile-label">
        Contact Number:
        <input
          type="text"
          name="contactNumber"
          value={updatedUser.contactNumber}
          onChange={handleInputChange}
          className="edit-profile-input"
        />
      </label>
      <button onClick={handleSave} className="edit-profile-button">
        Save
      </button>
    </div>
  );
};

export default EditProfile;
