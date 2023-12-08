// // routes/user.js
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { createUser } = require('../models/Users');
// const validator = require('validator');

// // Load the JWT secret key from the environment variable
// const secretKey = process.env.JWT_SECRET || 'default_fallback_secret';

// router.post('/signup', async (req, res) => {
//     try {
//       const { name, email, password, contactNumber } = req.body;
//       const connection = req.db;
  
//       // Validate email format using validator
//       if (!validator.isEmail(email)) {
//         return res.status(400).json({ message: 'Invalid email format' });
//       }
  
//       // Validate contact number format using a custom regex
//       const contactNumberRegex = /^\d{11}$/;
//       if (!validator.matches(contactNumber, contactNumberRegex)) {
//         return res.status(400).json({ message: 'Invalid contact number format' });
//       }
  
//       // Check if the email is already registered
//       const [existingUsers] = await connection.execute(
//         'SELECT * FROM users WHERE email = ?',
//         [email]
//       );
  
//       if (existingUsers.length > 0) {
//         return res.status(400).json({ message: 'Email is already registered', field: 'email' });
//       }
  
//       // Check if the contact number is already registered
//       const [existingContactNumbers] = await connection.execute(
//         'SELECT * FROM users WHERE contactNumber = ?',
//         [contactNumber]
//       );
  
//       if (existingContactNumbers.length > 0) {
//         return res
//           .status(400)
//           .json({ message: 'Contact number is already registered', field: 'contactNumber' });
//       }
  
//       // Create a new user
//       const userId = await createUser(connection, { name, email, password, contactNumber });
  
//       res.status(201).json({ message: 'User registered successfully', userId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const connection = req.db;
  
//       // Check if the user with the provided email exists
//       const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  
//       if (existingUsers.length === 0) {
//         return res.status(401).json({ message: 'User not found', field: 'email' });
//       }
  
//       const user = existingUsers[0];
  
//       // Check if the provided password matches the stored hashed password
//       const passwordMatch = await bcrypt.compare(password, user.password);
  
//       if (!passwordMatch) {
//         return res.status(401).json({ message: 'Invalid password', field: 'password' });
//       }
  
//       // If the credentials are valid, generate a JWT token
//       const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
//         expiresIn: '1h',
//       });
  
//       res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, getUserProfile, getAllUsersController  } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);

// Route for fetching and updating user profile
router.get('/profile/:userId', getUserProfile);
router.put('/profile/:userId', updateProfile);
router.get('/users', getAllUsersController);

module.exports = router;

