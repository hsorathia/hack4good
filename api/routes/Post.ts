import express from 'express';
const { User } = require('../models/User');
const { Post } = require('../models/Post');
// eslint-disable-next-line
const router = express.Router();

router.post('/postItem', async (req, res) => {
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
    { new: true }
  );
  return res.json(newPost);
});

router.post('/claimItem', async (req, res) => {
  const {
    userID,
    postID
  } = req.body;
  
  const claimedPost = await Post.findOneAndUpdate(
    { _id: postID },
    { claimed: true },
    { new: true }
  ).catch(() => {
    return res.status(400).send('Failed to update post');
  });
  const user = await User.findOneAndUpdate(
    { _id: userID },
    { $addToSet: { claimedPost: claimedPost } },
    { new: true }
  );
  if (!claimedPost) return res.status(400).send('Error fetching post');
  return res.status(200).json(claimedPost);
});

router.get('/getItems', async (req, res) => {
  const itemName = req.body.itemName || '';
  const condition = req.body.condition || '';
  const claimed = req.body.claimed || false;
  const posts = await Post.find(
    {
      itemName: { $regex: new RegExp(`.*${itemName}.*`) },
      condition: { $regex: new RegExp(`${condition}`) },
      claimed
    }
  ).catch(() => {
    return res.status(400).send('Error fetching posts');
  });
  return res.status(200).json(posts);
});

module.exports = router;
