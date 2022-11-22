const express = require('express'); 
const router = express.Router();

const { getPost, getPosts, getUserPosts, createPost, likePost, unlikePost, deletePost } = require("../controllers/post")
const { protect } = require('../middleware/auth')
const upload = require("../middleware/multer");

router.get("/all", getPosts);
router.get("/user/:id", protect, getUserPosts);
router.get("/:id", getPost);
router.post("/add", protect, upload.single("post"), createPost);
router.put("/like/:id", protect, likePost);
router.put("/unlike/:id", protect, unlikePost);
router.delete("/:id", protect, deletePost);


module.exports = router;
