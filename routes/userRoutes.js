const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet. Will be added soon.',
  });
};
const addNewUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet. Will be added soon.',
  });
};
const editUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet. Will be added soon.',
  });
};
const getUserDetail = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet. Will be added soon.',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet. Will be added soon.',
  });
};
router.route('/').get(getAllUsers).post(addNewUser);
router.route('/:id').get(getUserDetail).patch(editUser).delete(deleteUser);

module.exports = router;
