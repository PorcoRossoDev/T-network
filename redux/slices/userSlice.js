import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiPost } from "../../services/api";

// Async thunk for deleting account
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async ({ password }, { rejectWithValue }) => {
    try {
      const { data } = await apiPost("/auth/delete-account", {
        password: password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  faceIdEnabled: false,
  deleteAccountLoading: false,
  deleteAccountError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.faceIdEnabled = false;
    },
    updateProfile(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    enableFaceId(state) {
      state.faceIdEnabled = true;
    },
    disableFaceId(state) {
      state.faceIdEnabled = false;
    },
    clearDeleteAccountError(state) {
      state.deleteAccountError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.deleteAccountLoading = true;
        state.deleteAccountError = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.deleteAccountLoading = false;
        state.userInfo = null;
        state.isLoggedIn = false;
        state.faceIdEnabled = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.deleteAccountLoading = false;
        state.deleteAccountError = action.payload;
      });
  },
});

export const {
  login,
  logout,
  updateProfile,
  enableFaceId,
  disableFaceId,
  clearDeleteAccountError,
} = userSlice.actions;
export default userSlice.reducer;
