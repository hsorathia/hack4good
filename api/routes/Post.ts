import express from 'express';
const { User } = require('../models/User');
const { Post } = require('../models/Post');
// eslint-disable-next-line
const router = express.Router();

router.post('/postItem', async (req: any, res) => {
  const {
    userID,
    itemName,
    itemDescription,
    zipCode,
    condition,
    image
  } = req.body;
  const newPost = await Post.create({
    itemName, itemDescription, zipCode, condition, claimed: false, image
  })
  .catch(() => {
    return res.status(400).send('Failed to create post');
  });
  if (!newPost) return res.status(400).send('Failed to create post');
  const user = await User.findOneAndUpdate(
    { _id: userID },
    { $addToSet: { authoredPost: newPost } },
    {
      returnNewDocument: true
    }
  );
  return res.json(user);
});

module.exports = router;
