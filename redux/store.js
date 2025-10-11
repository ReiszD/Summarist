import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import booksReducer from "./booksSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    books: booksReducer,
    user: userReducer,
  },
});

export default store;