import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/profile.module.css';
import EditProfile from './Utilities/EditProfile';
import Booking from './Utilities/Booking';

const Profile = ({ userId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userIdToFetch = userId !== undefined ? userId : localStorage.getItem('userId');

        if (!userIdToFetch) {
          console.error('userId is undefined');
          return;
        }

        const response = await axios.get(`http://localhost:8081/api/user/profile/${userIdToFetch}`);

        if (response.status === 200) {
          setUser(response.data);
          setIsLoggedIn(true); 
          console.log('Fetched user details:', response.data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = () => {
    console.log('Clicked Edit button in Profile');
    setIsEditing(true);
  };

  const handleCloseEdit = async () => {
    console.log('Closing EditProfile modal in Profile');
    setIsEditing(false);

    // Refetch user details after closing the EditProfile modal
    await fetchUser();
  };

  const handleLogout = () => {
    // Implement logout logic here
    // Clear user data and set login status to false
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userId');
    navigate('/');
  }

  // Conditional rendering based on login status
  if (!isLoggedIn) {
    // Render login component or redirect to login page
    return (
      <div>
        <p>Please log in to view your profile.</p>
        {/* You can add a login form or redirect to the login page */}
      </div>
    );
  }

  return (
    <div className={styles['profile-container']}>
      <div className={styles['profile-box-container']}>
        {user && (
          <div className={styles['profile-box']}>
            <div className={styles['profile-details']}>
              <h1>Contact Details</h1>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Contact Number:</strong> {user.contactNumber}
              </p>
            </div>
            <div className={styles['profile-actions']}>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleLogout}>Logout</button>  
            </div>
          </div>
        )}

        {isEditing && user && (
          <div className={styles['edit-profile-form']}>
            <EditProfile user={user} onClose={handleCloseEdit} />
          </div>
        )}
      </div>
      <div className={styles['booking-section']}>
        <div className={styles['booking-container']}>
          <Booking userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
