import * as types from "../actions/types";

const initialState = {
  posts: [],
  currentPost: null,
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case types.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case types.GET_POST_DETAILS:
      return {
        ...state,
        currentPost: action.payload,
      };
    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        currentPost: null,
      };
    case types.UPDATE_POST:
      return {
        ...state,
        posts: state.post.map((post) => {
          if (post._id === action.payload) {
            return action.paylaod;
          } else {
            return post;
          }
        }),
        currentPost: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
