const cloudinary = require("../middleware/cloudinary");
const asyncHandler = require('express-async-handler')
const Post = require('../models/Post');

// @desc    get posts
// @route   GET /api/posts 
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()

    res.status(200).json(posts)
})

// @desc    get posts
// @route   GET /api/posts/user/:id
// @access  Public
const getUserPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.params.id })

    res.status(200).json(posts)
})

// @desc    get post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error("Post not found")
    }

    res.status(200).json(post)
})

// @desc    create post
// @route   POST /api/posts/add
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    let image =  await cloudinary.uploader.upload(req.file.path);

    if (!image) {
        res.status(400)
        throw new Error("Please add an image")
    }
    const [lat, lng] = req.body.location.split(",")

    const post = await Post.create({
        image: image.secure_url,
        cloudinaryId: image.public_id, 
        likes: 0,
        user: req.user.id,
        location: (lat && lng) ? [Number(lng), Number(lat)] : null
    })

    res.status(200).json(post)
})

// @desc    update (like) post
// @route   PUT /api/posts/like/:id
// @access  Private
const likePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(400)
        throw new Error("Post not found")
    }

    await Post.updateOne({ _id: req.params.id}, { $inc: { likes: 1 } })
    const liked = await Post.findOne({ _id: req.params.id })

    res.status(200).json(liked)
})

// @desc    update (unlike) post
// @route   PUT /api/posts/unlike/:id
// @access  Private
const unlikePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(400)
        throw new Error("Post not found")
    }

    const unliked = await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } })

    res.status(200).json(unliked)
})

// @desc    delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(400)
        throw new Error("Post not found")
    }

    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // make sure logged in user created the post 
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await cloudinary.uploader.destroy(post.cloudinaryId);
    await post.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getPosts, 
    getPost,
    getUserPosts,
    createPost, 
    likePost, 
    unlikePost, 
    deletePost,
}