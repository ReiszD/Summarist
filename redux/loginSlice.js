// redux/loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  redirectTo: "/", // default redirect
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openLogin: (state, action) => {
      state.isLoginOpen = true;
      state.redirectTo = action.payload || "/"; // allow dynamic redirect
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
      state.redirectTo = "/"; // reset when closed
    },
  },
});

export const { openLogin, closeLogin } = loginSlice.actions;
export default loginSlice.reducer;