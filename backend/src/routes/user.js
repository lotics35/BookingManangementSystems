
const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, getUserProfile, getAllUsersController, deleteUser, editUser} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);

// Route for fetching and updating user profile
router.get('/profile/:userId', getUserProfile);
router.put('/profile/:userId', updateProfile);
router.get('/users', getAllUsersController);
router.delete('/users/:userId', deleteUser);
router.get('/edit/:userId', editUser);

module.exports = router;

