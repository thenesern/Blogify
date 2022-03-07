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

export const getPostDetails = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid request",
    });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndRemove(_id);
    res.status(204).json(deletedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
