const express = require('express');
const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const router = express.Router();
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
  } = require('../controllers/userController')

  // Route to get all users (only accessible by admin)
  router.get('/',authenticateUser, authorizePermissions('admin'), getAllUsers);  
  router.get('/show',authenticateUser, showCurrentUser);
  router.patch('/updateUser',authenticateUser, updateUser);
  router.patch("/updateUserPassword",authenticateUser, updateUserPassword);
  router.get('/:id', authenticateUser, getSingleUser);

module.exports = router;