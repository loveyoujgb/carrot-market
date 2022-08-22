import { configureStore } from "@reduxjs/toolkit";
import modules from "../modules/modulesSlice";
import detail from "../modules/detailSlice";

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    modules,
    detail,
  },
});

// export default store;
