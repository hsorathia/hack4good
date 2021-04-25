import express from 'express';
import jwt from 'jsonwebtoken';
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
// eslint-disable-next-line
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body.data.req;
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  });
  // user doesn't exist
  if (!user) return res.status(400).send('Invalid user');
  const loggedIn = await bcrypt.compare(password, user.password);
  // Password incorrect
  if (!loggedIn) return res.status(400).send('Incorrect password');

  // Log user in
  const token = jwt.sign(
    {
      userID: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
    'averysupersecretkey',
    { expiresIn: '1h' }
  );
  return res.json({
    token,
    tokenExpiration: 1,
  });
});

router.post('/register', async (req, res) => {
  const { nickname, phoneNumber, password, email } = req.body.data.req;
  // see if user exists
  const existingUser = await User.findOne({
    $or: [{ nickname }, { email }],
  });
  if (existingUser) {
    // User already created
    return res.status(400).send('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  let newUser;
  await User.create({
    username: nickname,
    password: hashedPassword,
    phone: phoneNumber,
    email: email,
  }).then((res: any) => {
    // error creating
    if (!res) return res.status(400).send('Failed to create user');
    newUser = res;
  }).catch(() => {
    return res.status(400).send('Failed to create user');
  });
  return res.status(200).send(newUser);
});

module.exports = router;
