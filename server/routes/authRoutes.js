const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  login,
  register,
  logout,
} = require('../controllers/authController');


router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);


module.exports = router;
