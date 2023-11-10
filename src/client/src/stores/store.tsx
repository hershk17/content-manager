import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";

export const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
