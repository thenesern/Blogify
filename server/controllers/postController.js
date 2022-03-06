import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid request",
    });
  }
};

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.json(201).json(newPost);
  } catch (err) {
    res.status(409).json({
      status: "Failed",
      message: err.message,
    });
  }
};
