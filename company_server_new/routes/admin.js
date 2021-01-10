const User = require('../models/User');
const router = require('express').Router();
const Post = require('../models/Post');

router.get('/user', async (req, res) => {
	const cac = await User.find({});
	res.status(200).json(cac);
});

router.delete('/post', async (req, res) => {
	await Post.deleteMany({});

	await User.deleteMany({});
	res.end('Ok');
});

module.exports = router;
