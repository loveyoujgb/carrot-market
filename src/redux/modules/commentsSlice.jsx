import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const __postComments = createAsyncThunk(
  "postComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/comments", payload);
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __readComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/comments");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejected(error);
    }
  }
);
export const __deleteComments = createAsyncThunk(
  "deleteComments",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [__postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.comments = [...state.comments, payload];
      console.log(state.comments);
    },
    [__postComments.rejected]: (state) => {
      state.isLoading = false;
    },
    [__readComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__readComments.fulfilled]: (state, { payload }) => {
      console.log(payload.data);
      state.isLoading = false;
      state.comments = payload.data;
    },
    [__readComments.rejected]: (state) => {
      state.isLoading = false;
    },
    [__deleteComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComments.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (comment) => comment.id !== payload
      );
    },
    [__deleteComments.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});


export default commentsSlice.reducer;