import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
  isLoading: false,
  error: null,
};

export const __readLists = createAsyncThunk("getLists", async (payload, thunkAPI) => {
  try {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/article`, {
      params: payload,
    });
    return thunkAPI.fulfillWithValue(data.data.content);
  } catch (error) {
    return thunkAPI.rejected(error);
  }
});

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: {
    [__readLists.pending]: (state) => {
      state.isLoading = true;
    },
    [__readLists.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.lists = payload;
    },
    [__readLists.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default listsSlice.reducer;
