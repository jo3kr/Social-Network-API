// importing mongoose and dateFormat for timestamp
const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

// reactions schema
const reactionsSchema = new Schema(
    {
    // Set custom ID 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (timestamp) => dateFormat(timestamp),
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);

//thoughts schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
   username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (timestamp) => dateFormat(timestamp),
    },
    reactions: [
      {
        type: reactionSchema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
