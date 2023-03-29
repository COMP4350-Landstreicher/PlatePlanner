const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const {User} = require('../models/userModel');
const validator = require('email-validator');
const {validateUser, getUser, createUser} = require('../utils/authUtils');

const login = asyncHandler( async (req, res) => {
  const {email, password} = req.body;
  if ( !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }


  if (await validateUser(email, password, User)) {
    // If valid user, return a session cookie
    res.cookie('token',
      jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'}),
      {httpOnly: true},
    );
    res.json({'message': 'Logged in successfully'});
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const register = asyncHandler( async (req, res) => {
  const {userName, email, password, firstName, lastName} = req.body;

  if ( !userName || !email || !password || !firstName || !lastName) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  if (!validator.validate(email)) {
    res.status(400);
    throw new Error('Please include a valid email');
  }

  if (!(await getUser(email, User))) { // Check if the user exists
    if (await createUser(
      email, userName, password, firstName, lastName, User,
    )) {
      res.status(200).json({
        message: 'A new account has been successfully created',
      });
    }
  } else {
    res.status(400);
    throw new Error('User already exists');
  }
});

const logout = asyncHandler( async (req, res) =>{
  res.clearCookie('token');
  res.status(200).json({message: 'Logged out'});
});

module.exports = {
  login,
  register,
  logout,
};
