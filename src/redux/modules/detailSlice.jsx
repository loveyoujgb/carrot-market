import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { __readLists } from "./listSlice";

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  detail: [],
  isLoading: false,
  error: null,
};

export const __getDetail = createAsyncThunk("getDetail", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const data = await axios.get(`${API_URL}/article/${payload}`, {
      headers: {
        Authorization: token,
      },
    });
    if (username === data.data.username) {
      return thunkAPI.fulfillWithValue({ ...data.data, isSeller: true });
    } else return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteDetail = createAsyncThunk("deleteDetail", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/article/auth/${payload}`, {
      headers: {
        Authorization: token,
      },
    });
    thunkAPI.dispatch(__readLists());
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postUserHeart = createAsyncThunk("userHeartPost", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.post(`${API_URL}/like/auth/${payload}`, "", {
      headers: {
        Authorization: token,
      },
    });
    thunkAPI.dispatch(__getDetail(payload));
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    cleartDetail: (state) => {
      state.detail = [];
    },
  },
  extraReducers: {
    [__getDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__getDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__deleteDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postUserHeart.pending]: (state) => {
      state.isLoading = true;
    },
    [__postUserHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail.like = action.payload;
    },
    [__postUserHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { cleartDetail } = detailSlice.actions;
export default detailSlice.reducer;
