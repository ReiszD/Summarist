import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    books: booksReducer,
  },
});

export default store;