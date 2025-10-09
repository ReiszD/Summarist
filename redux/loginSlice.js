import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isLoginOpen = true;
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
    },
  },
});

export const { openLogin, closeLogin } = loginSlice.actions;
export default loginSlice.reducer;