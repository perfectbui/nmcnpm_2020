const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const Post = require("../models/Post");
const upload = require("../lib/multer");
const cloudinary = require("../lib/cloudinary");
const { v4: uuidv4 } = require("uuid");

//d5c78e03-6ecc-44de-8e47-9b882d48e540

router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id)
    const allPosts = await Post.find({});
    console.log('allPosts', allPosts)
    const content = allPosts.find((item) => item._id == id).test
      .content;
    res.status(200).json({
      content,
    });
  } catch (error) {
    console.log('error', error)
    res.status(400).json({
      error,
    });
  }
});

router.post("/:id", authenticate, async (req, res) => {
  try {
    const idUserTaken = req.decoded._id;

    const { id } = req.params;

    const randomScore = Math.floor(Math.random() * 11);

    const taken = JSON.stringify({
      id: idUserTaken,
      name: "Khiem",
      date: Date.now(),
      score: randomScore,
    });

    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          usersTaken: taken,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      post,
      score: randomScore,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

router.get("/:id/ranking", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Post.findOne({ "test.id": id });

    const usersTaken = test.usersTaken.map((item) => {
      return JSON.parse(item);
    });

    usersTaken.reverse();

    res.json({
      usersTaken: usersTaken,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json({
      error,
    });
  }
});

module.exports = router;
