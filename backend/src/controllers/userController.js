// controllers/userController.js
const validator = require('validator');
const { createUser, getUserByEmail,getUserById,updateUserProfile,checkIfUserExists, getAllUsers } = require('../models/Users');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { name, email, password, contactNumber } = req.body;
    const connection = req.db;

    // Validate email format using validator
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate contact number format using a custom regex
    const contactNumberRegex = /^\d{11}$/;
    if (!validator.matches(contactNumber, contactNumberRegex)) {
      return res.status(400).json({ message: 'Invalid contact number format' });
    }

    try {
      // Check if the email or contact number already exists in the database
      const emailExists = await checkIfUserExists(connection, { email });
      const contactNumberExists = await checkIfUserExists(connection, { contactNumber });

      if (emailExists && contactNumberExists) {
        return res.status(400).json({ message: 'Email and contact number already registered', field: 'both' });
      } else if (emailExists) {
        return res.status(400).json({ message: 'Email already registered', field: 'email' });
      } else if (contactNumberExists) {
        return res.status(400).json({ message: 'Contact number already registered', field: 'contactNumber' });
      }
    
      // Create a new user
      const userId = await createUser(connection, { name, email, password, contactNumber });
    
      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      console.error(error);

      // Log the specific error message for debugging
      console.error('Specific error message:', error.message);
    
      // Handle specific errors
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email or contact number already registered', field: 'email' });
      }
    
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = req.db;

    // Check if the user with the provided email exists
    const user = await getUserByEmail(connection, email);

    if (!user) {
      return res.status(401).json({ message: 'User not found', field: 'email' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password', field: 'password' });
    }

    // If the credentials are valid, set an HTTP-only cookie and include user ID in the response
    const token = 'your-secret-key'; // Replace with your actual secret key
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' });
    }

    // Use the getUserById function to retrieve the user details
    const user = await getUserById(req.db, userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user details in the response
    const { name, email, contactNumber } = user;
    res.json({ name, email, contactNumber });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log('Received request:', req.body);
    console.log('Received userId:', req.params.userId);
    const { name, email, contactNumber } = req.body;
    const userId = req.params.userId;

    // Validate mandatory fields
    if (!name || !email || !contactNumber) {
      return res.status(400).json({ message: 'Name, email, and contactNumber are required fields' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate contact number format
    const contactNumberRegex = /^\d{11}$/;
    if (!validator.matches(contactNumber, contactNumberRegex)) {
      return res.status(400).json({ message: 'Invalid contact number format' });
    }

    const connection = req.db;
    const existingUser = await getUserById(connection, userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isUpdateSuccessful = await updateUserProfile(connection, userId, {
      name: name || existingUser.name,
      email: email || existingUser.email,
      contactNumber: contactNumber || existingUser.contactNumber,
    });

    if (isUpdateSuccessful) {
      res.status(200).json({ message: 'User profile updated successfully' });
    } else {
      res.status(500).json({ message: 'Failed to update user profile' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const connection = req.db;

    // Retrieve all users from the database
    const users = await getAllUsers(connection);

    // Send the list of users in the response
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, login, updateProfile, getUserProfile,getAllUsersController };


