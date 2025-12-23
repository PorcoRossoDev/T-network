import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../../services/api";

// Async thunk để fetch unread count
export const fetchUnreadCount = createAsyncThunk(
  "notification/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiGet("/notifications/unread-count");
      return data.unread_count || 0;
    } catch (error) {
      console.log("Error fetching unread count:", error.message);
      return rejectWithValue(0);
    }
  }
);

// Async thunk để mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await apiPost(`/notifications/${notificationId}/mark-as-read`);
      return notificationId;
    } catch (error) {
      console.log("Error marking notification as read:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Action để giảm unread count khi mark as read
    decrementUnreadCount: (state) => {
      if (state.unreadCount > 0) {
        state.unreadCount -= 1;
      }
    },
    // Action để reset unread count
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    // Action để set unread count trực tiếp
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Reset all state to initial state
    reset: (state) => {
      return {
        unreadCount: 0,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch unread count
      .addCase(fetchUnreadCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.loading = false;
        state.unreadCount = action.payload;
      })
      .addCase(fetchUnreadCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.unreadCount = 0;
      })
      // Mark as read
      .addCase(markNotificationAsRead.fulfilled, (state) => {
        if (state.unreadCount > 0) {
          state.unreadCount -= 1;
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  decrementUnreadCount,
  resetUnreadCount,
  setUnreadCount,
  clearError,
  reset,
} = notificationSlice.actions;

export default notificationSlice.reducer;
