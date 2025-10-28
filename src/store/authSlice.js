// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,   // null = unknown (not checked yet), true = logged in, false = logged out
  userData: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // accept raw user object as payload
    login: (state, action) => {
      console.log("[authSlice] login reducer called:", action.payload);
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      console.log("[authSlice] logout reducer called");
      state.status = false;
      state.userData = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
