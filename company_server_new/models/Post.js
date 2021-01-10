const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  userPost: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },

  date: {
    type: Date,
    required: true,
  },

  timeCreated: {
    type: Date,
    default: Date.now,
  },

  test: {
    id: {
      type: String,
    },
    content: String,
  },
  usersTaken: [String],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
