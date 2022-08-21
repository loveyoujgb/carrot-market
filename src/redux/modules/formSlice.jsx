import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_MODULES = process.env.REACT_APP_MODULES_API_URL;

const initialState = {
  form: {},
};

// export const __getmodules = createAsyncThunk("modules/getModules", async (payload, thunkAPI) => {
//   try {
//     const data = await axios.get(`${API_MODULES}`);
//     return thunkAPI.fulfillWithValue(data.data);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const __deletemodules = createAsyncThunk("modules/deleteModules", async (payload, thunkAPI) => {
//   try {
//     const data = await axios.delete(`${API_MODULES}/${payload}`);
//     thunkAPI.dispatch(__getTodos());
//     return thunkAPI.fulfillWithValue(data.data);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const __postmodules = createAsyncThunk("modules/postModules", async (payload, thunkAPI) => {
//   try {
//     const data = await axios.post(`${API_TODOS}`, payload);
//     return thunkAPI.fulfillWithValue(data.data);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      //       let formData = new FormData();

      // for (var i = 0; i < acceptedFiles.length; i++) {
      //   let file = acceptedFiles[i];
      //   formData.append("articleFiles[]", file);
      // }
      // console.log(formData);
      console.log(action);
      // state.form = action.payload;
    },
  },
  extraReducers: {
    // [__getmodules.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__getmodules.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.modules = action.payload;
    // },
    // [__getmodules.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { addPhoto } = formSlice.actions;
export default formSlice.reducer;
