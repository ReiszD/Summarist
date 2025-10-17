import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  redirectTo: "/",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openLogin: (state, action) => {
      state.isLoginOpen = true;
      state.redirectTo = action.payload || "/";
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
      state.redirectTo = "/";
    },
  },
});

export const { openLogin, closeLogin } = loginSlice.actions;
export default loginSlice.reducer;