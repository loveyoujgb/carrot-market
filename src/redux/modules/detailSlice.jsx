import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  changeMode: {
    mode: false,
    id: 0,
  },
  userheart: false,
  detail: [],
  isLoading: false,
  error: null,
};

export const __getDetail = createAsyncThunk("getDetail", async (payload, thunkAPI) => {
  try {
    console.log(payload);
    const data = await axios.get(`${API_URL}/article/${payload.id}`);
    console.log(data);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteDetail = createAsyncThunk("deleteDetail", async (payload, thunkAPI) => {
  try {
    const data = await axios.delete(`${API_URL}/article/auth/${payload}`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postUserHeart = createAsyncThunk("userHeartPost", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.post(`${API_URL}/like/auth/${payload.id}`, {
      headers: {
        Authorization: token,
      },
    });
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getUserHeart = createAsyncThunk("userHeartPost", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(`${API_URL}/like/auth/${payload.id}`, {
      headers: {
        Authorization: token,
      },
    });
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      //       let formData = new FormData();

      // for (var i = 0; i < acceptedFiles.length; i++) {
      //   let file = acceptedFiles[i];
      //   formData.append("articleFiles[]", file);
      // }
      // console.log(formData);
      console.log(action);
      state.changeMode = action.payload;
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
      state.detail.filter((article) => article.id !== action.payload);
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
      state.userheart = action.payload;
    },
    [__postUserHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getUserHeart.pending]: (state) => {
      state.isLoading = true;
    },
    [__getUserHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userheart = action.payload;
    },
    [__getUserHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { changeMode } = detailSlice.actions;
export default detailSlice.reducer;
