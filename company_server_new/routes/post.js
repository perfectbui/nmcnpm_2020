const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const Post = require("../models/Post");
const upload = require("../lib/multer");
const cloudinary = require("../lib/cloudinary");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  try {
    const allPost = await Post.find({})
      .populate("userPost", "userName avatar age address phone email")
      .sort({ timeCreated: -1 });

    res.status(200).json({
      posts: allPost,
    });
  } catch (err) {
    console.log("Error : ", err);
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params["email"];
    console.log(email);

    Post.find({})
      .sort({ timeCreated: -1 })
      .populate({
        path: "userPost",
        select: "userName avatar email age address phone",
      })
      .exec((err, docs) => {
        if (err) {
          throw new Error(err);
        }
        console.log('docs', docs)
        docs = docs.filter((doc) => doc.userPost.email === email);
        res.status(200).json({
          posts: docs,
        });
      });
  } catch (err) {
    console.log("Error : ", err);
    res.status(400).json({
      message: err,
    });
  }
});

router.post(
  "/uploadImg",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(req.file.path);
      let resultUrl = result.url;
      if (result.width > 550) {
        const image = result.url.split("/kh1em/")[1];
        resultUrl = cloudinary.url(image, {
          width: 550,
          crop: "fill",
        });
      }

      res.status(200).json({
        imageUrl: resultUrl,
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(500).json({
        message: error,
      });
    }
  }
);

router.post("/", authenticate, async (req, res) => {
  try {
    const idUserPost = req.decoded._id;
    const { name, address, date, content, image, test } = req.body;

    const newPost = new Post({
      name,
      address,
      date: date ? date : Date.now(),
      content,
      image,
      userPost: idUserPost,
      test: test
        ? {
            id: uuidv4(),
            content: test,
          }
        : null,
    });
    await newPost.save();

    res.status(200).json({
      post: newPost,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/:postId", authenticate, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId, "userPost");
    if (post.userPost.toString() === req.decoded._id) {
      await Post.deleteOne({ _id: postId });
      res.status(200).end();
    } else {
      res.status(401).json({
        message: "Không có quyền xóa bài đăng",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/", async (req, res) => {
  await Post.deleteMany({});
  res.end();
});

module.exports = router;
