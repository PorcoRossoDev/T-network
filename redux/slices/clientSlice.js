import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../../services/api";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const params = searchQuery ? { keyword: searchQuery } : {};
      const { data } = await apiGet("/visit-reports", { params });
      return data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Không thể tải danh sách báo cáo dẫn khách."
      );
    }
  }
);

// Thêm fetchClientsForEstate để fetch clients cho một estate cụ thể
export const fetchClientsForEstate = createAsyncThunk(
  "clients/fetchClientsForEstate",
  async ({ estateId, searchQuery = "" }, { rejectWithValue }) => {
    try {
      const params = searchQuery ? { keyword: searchQuery } : {};
      const endpoint = `/visit-reports/estates/${estateId}`;
      const { data } = await apiGet(endpoint, { params });
      return { estateId, clients: data.data || [] };
    } catch (error) {
      return rejectWithValue(
        error.message || "Không thể tải danh sách báo cáo dẫn khách."
      );
    }
  }
);

export const submitReport = createAsyncThunk(
  "clients/submitReport",
  async ({ formDataToSend, reportId }, { rejectWithValue }) => {
    try {
      console.log("🚀 Redux submitReport received FormData");
      console.log("📦 FormData object:", formDataToSend);
      console.log("🆔 Report ID:", reportId);

      // FormData is already created in ClientFormScreen
      // No need to create or validate here, just send it

      const endpoint = reportId
        ? `/visit-reports/${reportId}`
        : "/visit-reports";

      console.log("🌐 Sending to endpoint:", endpoint);

      const { data } = await apiPost(endpoint, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ API Response:", data);
      return { report: data.data, message: data.message, isUpdate: !!reportId };
    } catch (error) {
      console.log("💥 Redux submitReport error:", error);
      console.log("💥 Error response:", error.response?.data);
      console.log("💥 Error status:", error.response?.status);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Không thể ${reportId ? "cập nhật" : "tạo"} báo cáo.`;

      return rejectWithValue(errorMessage);
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    isLoading: false,
    error: null,
    refreshing: false,
    // Thêm state cho estate-specific clients
    estateClients: {}, // { estateId: clients[] }
    estateLoading: {}, // { estateId: boolean }
  },
  reducers: {
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },
    // Reset all state to initial state
    reset: (state) => {
      return {
        clients: [],
        isLoading: false,
        error: null,
        refreshing: false,
        estateClients: {},
        estateLoading: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload;
        state.refreshing = false;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.refreshing = false;
      })
      // Thêm cases cho fetchClientsForEstate
      .addCase(fetchClientsForEstate.pending, (state, action) => {
        const estateId = action.meta.arg.estateId;
        state.estateLoading[estateId] = true;
        state.error = null;
      })
      .addCase(fetchClientsForEstate.fulfilled, (state, action) => {
        const { estateId, clients } = action.payload;
        state.estateLoading[estateId] = false;
        state.estateClients[estateId] = clients;
      })
      .addCase(fetchClientsForEstate.rejected, (state, action) => {
        const estateId = action.meta.arg.estateId;
        state.estateLoading[estateId] = false;
        state.error = action.payload;
      })
      .addCase(submitReport.fulfilled, (state, action) => {
        if (action.payload.isUpdate) {
          // Update existing report in both lists
          const updatedReport = action.payload.report;
          state.clients = state.clients.map((client) =>
            client.id === updatedReport.id ? updatedReport : client
          );

          // Update in estate-specific lists
          Object.keys(state.estateClients).forEach((estateId) => {
            state.estateClients[estateId] = state.estateClients[estateId].map(
              (client) =>
                client.id === updatedReport.id ? updatedReport : client
            );
          });
        } else {
          // Add new report to beginning of both lists
          const newReport = action.payload.report;
          state.clients.unshift(newReport);

          // Add to estate-specific list if it has estate_id
          if (newReport.estates_id) {
            const estateId = newReport.estates_id.toString();
            if (state.estateClients[estateId]) {
              state.estateClients[estateId].unshift(newReport);
            }
          }
        }
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setRefreshing, reset } = clientSlice.actions;
export default clientSlice.reducer;
