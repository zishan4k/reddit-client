import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getSubredditPosts, getPostComments } from "../api/redditAPI";

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: "",
  selectedSubreddit: "/r/minecraft/",
};

const redditPostsSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    startGetPosts: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = "";
    },
    toggleShowingComments: (state, action) => {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    startGetComments: (state, action) => {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].error = false;
    },
    getCommentsSuccess: (state, action) => {
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentsFailed: (state, action) => {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
    },
  },
});

export const {
  setPosts,
  startGetPosts,
  getPostsSuccess,
  getPostsFailed,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  startGetComments,
  getCommentsSuccess,
  getCommentsFailed,
} = redditPostsSlice.actions;

export default redditPostsSlice.reducer;

//Redux Thunk to get posts from selected subreddit
export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());

    const posts = await getSubredditPosts(subreddit);
    const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));

    dispatch(getPostsSuccess(postsWithMetadata));
  } catch (error) {
    dispatch(getPostsFailed());
  }
};

//Thunk to get comments for post
export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(startGetComments(index));

    const comments = await getPostComments(permalink);

    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailed(index));
  }
};

//Selector Functions
const selectPosts = (state) => state.redditPosts.posts;
const selectSearchTerm = (state) => state.redditPosts.searchTerm;

export const selectSelectedSubreddit = (state) =>
  state.redditPosts.selectedSubreddit;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== "") {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);
