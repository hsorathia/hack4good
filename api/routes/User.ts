import express from 'express';
import jwt from 'jsonwebtoken';
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
// eslint-disable-next-line
const router = express.Router();

router.get('/login', async (req: any, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    // user doesn't exist
    if (!user) return res.status(400).send('Invalid user');
    const loggedIn = await bcrypt.compare(password, user.password);
    // Password incorrect
    if (!loggedIn) return res.status(400).send('Incorrect password');

    // Log user in
    const token = jwt.sign({
      userID: user.id,
      username: user.username,
      email: user.email
    },
    'averysupersecretkey',
    { expiresIn: '1h' }
    );
    return {
      userID: user.id,
      token,
      tokenExpiration: 1
    };
  }
);

router.post('/register', async (req: any, res) => {
  const { name, username, password, email } = req.body;
  // see if user exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });
  if (existingUser) {
    // User already created
    return res.status(400).send('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create(
    {
      name,
      username,
      password: hashedPassword,
      email
    }
  ).catch(() => {
    return res.status(400).send('Failed to create user');
  });
  // error creating
  if (!newUser) return res.status(400).send('Failed to create user');
  console.log(newUser);
  return res.json(newUser);
});

module.exports = router;
