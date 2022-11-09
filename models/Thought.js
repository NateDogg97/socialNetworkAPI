const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');
const { format_date } = require('../utils/formatDate');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => format_date(date)
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
    timestamps: true
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// thoughtSchema.
//   virtual('formatTime')
//   .get(function() {
//     return `${this.createdAt}`;
//   })
//   .set(function (v) {
//     const date = new Date( Date.parse(v) );
//     this.set({ date });
//   })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
