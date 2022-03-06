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
