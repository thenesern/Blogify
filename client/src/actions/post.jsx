import * as types from "./types";
import * as api from "../api/fetcher";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: types.GET_POSTS, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: types.CREATE_POST,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getPostDetails = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPostDetails(id);
    dispatch({ type: types.GET_POST_DETAILS, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);
    dispatch({
      type: types.DELETE_POST,
      payload: data._id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({
      type: types.UPDATE_POST,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
