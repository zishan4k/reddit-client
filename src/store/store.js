import { configureStore, combineReducers } from "@reduxjs/toolkit";
import redditPostsReducer from "./redditPostsSlice";
import subredditsReducer from "./subredditsSlice";

export default configureStore({
  reducer: combineReducers({
    redditPosts: redditPostsReducer,
    subreddits: subredditsReducer,
  }),
});
