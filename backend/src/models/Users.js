// models/User.js
const bcrypt = require('bcrypt');

async function createUser(connection, user) {
  const { name, email, password, contactNumber } = user;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  const [rows] = await connection.execute(
    'INSERT INTO users (name, email, password, contactNumber) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, contactNumber]
  );

  return rows.insertId; // Return the ID of the inserted user
}

async function getUserByEmail(connection, email) {
  // Retrieve user from the database by email
  const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

  // Return the user or null if not found
  return rows.length > 0 ? rows[0] : null;
}

async function getUserById(connection, userId) {
  // Retrieve user from the database by user ID
  const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);

  // Return the user or null if not found
  return rows.length > 0 ? rows[0] : null;
}

async function updateUserProfile(connection, userId, updatedUser) {
  const { name, email, contactNumber } = updatedUser;

  // Update user profile in the database
  const [rows] = await connection.execute(
    'UPDATE users SET name = ?, email = ?, contactNumber = ? WHERE id = ?',
    [name, email, contactNumber, userId]
  );

  // Check if the update was successful
  return rows.affectedRows > 0;
}

async function checkIfUserExists(connection, { email, contactNumber }) {
  // Check if a user with the given email or contact number already exists
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE email = ? OR contactNumber = ?',
    [email || null, contactNumber || null] // Ensure that parameters are not undefined
  );

  // Return true if a user with the provided data exists, false otherwise
  return rows.length > 0;
}

async function getAllUsers(connection) {
  // Retrieve all users from the database
  const [rows] = await connection.execute('SELECT * FROM users');

  // Return the array of users
  return rows;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserProfile,
  checkIfUserExists,
  getAllUsers
};
