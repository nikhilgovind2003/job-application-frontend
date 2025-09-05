// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import jobReducer from './slices/job/jobSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
});

export default store;
