import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./Slices/blogSlice"
const store = configureStore({
  reducer: {
    blogSlice: blogSlice,
  },
});
export default store;
