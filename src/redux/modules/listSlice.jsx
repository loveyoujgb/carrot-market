import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
  isLoading: false,
  error: null,
};

export const __readLists = createAsyncThunk(
  "getLists",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/lists");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejected(error);
    }
  }
);

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: {
    [__readLists.pending]: (state) => {
      state.isLoading = true;
    },
    [__readLists.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.modules = action.payload;
    },
    [__readLists.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default listsSlice.reducer;