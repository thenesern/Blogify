import axios from "axios";

const apiEndpoint = "http://localhost:5000/posts/";

export const getPosts = async () => {
  await axios.get(apiEndpoint);
};

export const createPost = async (post) => {
  await axios.post(apiEndpoint, post);
};
