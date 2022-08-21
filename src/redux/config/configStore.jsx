import { configureStore } from "@reduxjs/toolkit";
import modules from "../modules/modulesSlice";
import form from "../modules/formSlice";

export const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    modules,
    form,
  },
});

// export default store;
