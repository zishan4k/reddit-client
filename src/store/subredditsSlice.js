import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/redditAPI";

const initialState = {
  subreddits: [],
  error: false,
  isLoading: false,
};

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {
    startGetSubreddits: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditSuccess: (state, action) => {
      state.isLoading = false;
      state.subreddits = action.payload;
    },
    getSubredditsFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { startGetSubreddits, getSubredditSuccess, getSubredditsFailed } =
  subredditsSlice.actions;

export default subredditsSlice.reducer;

// Redux Thunk to get list of subreddits
export const fetchSubreddits = () => async (dispatch) => {
  try {
    dispatch(startGetSubreddits());
    const subreddits = await getSubreddits();
    dispatch(getSubredditSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsFailed());
  }
};
