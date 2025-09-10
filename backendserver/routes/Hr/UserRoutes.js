const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../../controller/hr/UserController');

// GET all users
router.get('/', getAllUsers);

// CREATE user
router.post('/', createUser);

// UPDATE user
router.put('/:id', updateUser);

// DELETE user
router.delete('/:id', deleteUser);

module.exports = router;
