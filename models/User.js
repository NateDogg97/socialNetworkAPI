const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const validateEmail = require('../utils/validateEmail');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      validate: [validateEmail, 'Please use a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.objectId, ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.objectId, ref: 'user'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
