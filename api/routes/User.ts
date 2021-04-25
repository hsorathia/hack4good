import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
const {User} = require('../models/User')
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/login', async (req: any, res: any) => {
    const { username, password } = req;
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    // user doesn't exist
    if (!user) return null;
    const loggedIn = await bcrypt.compare(password, user.password);
    // Password incorrect
    if (!loggedIn) return null;

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
      token: token,
      tokenExpiration: 1
    };
  }
)

module.exports = router;
