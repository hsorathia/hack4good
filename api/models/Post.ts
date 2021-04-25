import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String
    },
    condition: {
      type: String
    },
    claimed: {
      type: Boolean,
      required: true
    },
    image: {
      // Store Image URL
      type: String
    },

  },
  {
    collection: 'Posts'
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = {
  PostSchema,
  Post,
};
