import { configureStore } from "@reduxjs/toolkit";
import modules from "../modules/modulesSlice";
import comments from "../modules/commentsSlice"
import lists from "../modules/listSlice"

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    modules,
    comments,
    lists,
  },
});

// export default store;
