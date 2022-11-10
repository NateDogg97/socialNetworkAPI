const { Schema, model } = require('mongoose');
const { validateEmail } = require('../utils/validateEmail');

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
      match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please use a valid email address']
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
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
