import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Il magazzino centrale dell'app
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
