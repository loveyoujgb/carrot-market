import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { __getDetail } from "./detailSlice";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const __postComments = createAsyncThunk("postComments", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const data = await axios.post(`${process.env.REACT_APP_API_URL}/comment/auth/${payload.id}`, payload, {
      headers: {
        Authorization: token,
      },
    });
    thunkAPI.dispatch(__readComments(payload.id));
    thunkAPI.dispatch(__getDetail(payload.id));
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __readComments = createAsyncThunk("getComments", async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${payload}`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejected(error);
  }
});
export const __deleteComments = createAsyncThunk("deleteComments", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${process.env.REACT_APP_API_URL}/comment/auth/${payload}`, {
      headers: {
        Authorization: token,
      },
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: {
    [__postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.comments = [...state.comments, payload.content];
    },
    [__postComments.rejected]: (state) => {
      state.isLoading = false;
    },
    [__readComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__readComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.comments = payload;
    },
    [__readComments.rejected]: (state) => {
      state.isLoading = false;
    },
    [__deleteComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.comments = state.comments.filter((comment) => comment.id !== payload);
    },
    [__deleteComments.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default commentsSlice.reducer;
export const { clearComments } = commentsSlice.actions;
