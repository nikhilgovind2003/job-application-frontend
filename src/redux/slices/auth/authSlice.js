// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");
const user = localStorage.getItem("authUser");

const initialState = {
  token: token || null,
  user: user ? JSON.parse(user) : null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
