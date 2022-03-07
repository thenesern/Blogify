import axios from "axios";

const apiEndpoint = "https://blogify-backend-eneseren.herokuapp.com/posts";

export const getPosts = async () => await axios.get(apiEndpoint);

export const createPost = async (post) => await axios.post(apiEndpoint, post);

export const getPostDetails = async (id) =>
  await axios.get(`${apiEndpoint}${id}`);

export const deletePost = async (id) =>
  await axios.delete(`${apiEndpoint}${id}`);

export const updatePost = async (id, updatedPost) =>
  await axios.patch(`${apiEndpoint}${id}`, updatedPost);
