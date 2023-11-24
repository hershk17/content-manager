import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../../models/User";

const API_URL = import.meta.env.VITE_SERVER_URL;

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const validateUser = createAsyncThunk("auth/validateUser", async () => {
  const response = await axios.get(`${API_URL}/auth/validate`, {
    withCredentials: true,
  });
  return response.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.get(`${API_URL}/auth/logout`, {
    withCredentials: true,
  });
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(validateUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(validateUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});
