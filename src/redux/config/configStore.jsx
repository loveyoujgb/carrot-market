import { configureStore } from "@reduxjs/toolkit";
import modules from "../modules/modulesSlice";
import comments from "../modules/commentsSlice"

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    modules,
    comments,
  },
});

// export default store;
