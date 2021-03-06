import express from 'express';
const { User } = require('../models/User');
const { Post } = require('../models/Post');
// eslint-disable-next-line
const router = express.Router();

router.post('/postItem', async (req, res) => {
  const { userID, itemName, itemDescription, zipCode, condition, phone, email, image } = req.body;
  const newPost = await Post.create({
    itemName,
    itemDescription,
    zipCode,
    condition,
    phone,
    email,
    claimed: false,
    image,
  }).catch(() => {
    return res.status(400).send('Failed to create post');
  });
  if (!newPost) return res.status(400).send('Failed to create post');
  const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { authoredPost: newPost } }, { new: true });
  return res.json(newPost);
});

router.post('/claimItem', async (req, res) => {
  const { postID, claim } = req.body;

  const claimedPost = await Post.findOneAndUpdate({ _id: postID }, { claimed: claim }, { new: true }).catch(() => {
    return res.status(400).send('Failed to update post');
  });
  if (!claimedPost) return res.status(400).send('Error fetching post');
  return res.status(200).json(claimedPost);
});

router.get('/getItems', async (req, res) => {
  const itemName = req.body.itemName || '';
  const condition = req.body.condition || '';
  const zipCode = req.body.zipCode || '';
  const claimed = req.body.claimed || false;
  const startDate = req.body.startDate || '2020-04-15T15:47:19.954Z';
  const endDate = req.body.endDate || new Date();
  const posts = await Post.find({
    itemName: { $regex: new RegExp(`.*${itemName}.*`) },
    condition: { $regex: new RegExp(`${condition}`) },
    zipCode: { $regex: new RegExp(`${zipCode}.*`) },
    created_at: {
      $gte: startDate,
      $lt: endDate
    },
    claimed,
  }).catch(() => {
    return res.status(400).send('Error fetching posts');
  });
  return res.status(200).json(posts);
});

router.post('/getUserItems', async (req, res) => {
  const email = req.body.email;
  const posts = await Post.find({
    email: { $regex: new RegExp(`${email}`) },
  }).catch(() => {
    return res.status(400).send('Error fetching posts');
  });
  return res.status(200).json(posts);
});

module.exports = router;
