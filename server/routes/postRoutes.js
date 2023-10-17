const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { createPost, updatePost, deletePost, getAllPost, getPost } = require("../controller/postController");


router.post("/create", isLoggedIn, createPost);
router.put("/update/:id", isLoggedIn, updatePost);
router.delete("/delete/:id", isLoggedIn, deletePost);
router.get("/get", getAllPost);
router.get("/get/:id", getPost);

module.exports = router;