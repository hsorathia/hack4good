import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    authoredPost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts',
        }
    ],
    claimedPost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts',
        }
    ]
  },
  {
    collection: 'Users'
  }
);


const User = mongoose.model('User', UserSchema);

module.exports = {
  UserSchema,
  User,
};
