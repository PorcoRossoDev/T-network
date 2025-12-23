import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "../../services/api";

// Fetch customers with pagination
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (
    { searchQuery = "", page = 1, limit = 20, reset = false },
    { rejectWithValue, getState }
  ) => {
    try {
      // Avoid duplicate calls
      const currentState = getState().customers;
      if (currentState.isLoading && !reset) {
        return rejectWithValue("Request already in progress");
      }

      const params = {
        page,
        limit,
        ...(searchQuery && { keyword: searchQuery }),
      };

      const { data } = await apiGet("/customers", { params });

      // Check if API supports pagination
      if (data.data && Array.isArray(data.data)) {
        return {
          customers: data.data,
          pagination: {
            currentPage: data.current_page || page,
            totalPages: data.last_page || 1,
            totalItems: data.total || data.data.length,
            perPage: data.per_page || limit,
            hasMore: data.current_page < data.last_page || false,
          },
          reset,
        };
      }

      // Fallback for non-paginated API
      return {
        customers: data.data || [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: (data.data || []).length,
          perPage: limit,
          hasMore: false,
        },
        reset,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Không thể tải danh sách khách hàng."
      );
    }
  }
);

// Load more customers (for pagination)
export const loadMoreCustomers = createAsyncThunk(
  "customers/loadMoreCustomers",
  async ({ searchQuery = "", page }, { rejectWithValue, getState }) => {
    try {
      const currentState = getState().customers;

      if (currentState.isLoadingMore || !currentState.pagination.hasMore) {
        return rejectWithValue("No more data to load");
      }

      const params = {
        page,
        limit: currentState.pagination.perPage,
        ...(searchQuery && { keyword: searchQuery }),
      };

      const { data } = await apiGet("/customers", { params });

      return {
        customers: data.data || [],
        pagination: {
          currentPage: data.current_page || page,
          totalPages: data.last_page || 1,
          totalItems: data.total || 0,
          perPage: data.per_page || 20,
          hasMore: data.current_page < data.last_page || false,
        },
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Không thể tải thêm khách hàng."
      );
    }
  }
);

// Add or update customer
export const submitCustomer = createAsyncThunk(
  "customers/submitCustomer",
  async ({ customerData, customerId }, { rejectWithValue }) => {
    try {
      const payload = {
        name: customerData.name,
        phone: customerData.phone,
        cccd: customerData.cccd,
        address: customerData.address || "",
        birth_year: customerData.birthYear || "",
        email: customerData.email || "",
        note: customerData.note || "",
      };
      let response;
      if (customerId) {
        response = await apiPut(`/customers/${customerId}`, payload);
      } else {
        response = await apiPost("/customers", payload);
      }
      return {
        customer: customerId
          ? { id: customerId, ...response.data.customer }
          : response.data.customer,
        message: response.data.message,
        isUpdate: !!customerId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          `Không thể ${customerId ? "cập nhật" : "thêm"} khách hàng.`
      );
    }
  }
);

// Delete customer
export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      await apiDelete(`/customers/${customerId}`);
      return customerId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Không thể xóa khách hàng."
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    isLoading: false,
    isLoadingMore: false,
    error: null,
    refreshing: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      perPage: 20,
      hasMore: false,
    },
    searchQuery: "",
    lastSearchQuery: "",
  },
  reducers: {
    setRefreshing(state, action) {
      state.refreshing = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    resetPagination(state) {
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 20,
        hasMore: false,
      };
      state.customers = [];
    },
    // Reset all state to initial state
    reset: (state) => {
      return {
        customers: [],
        isLoading: false,
        isLoadingMore: false,
        error: null,
        refreshing: false,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          perPage: 20,
          hasMore: false,
        },
        searchQuery: "",
        lastSearchQuery: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.refreshing = false;

        if (action.payload.reset) {
          state.customers = action.payload.customers;
        } else {
          // Merge with existing customers (avoid duplicates)
          const existingIds = new Set(state.customers.map((c) => c.id));
          const newCustomers = action.payload.customers.filter(
            (c) => !existingIds.has(c.id)
          );
          state.customers = [...state.customers, ...newCustomers];
        }

        state.pagination = action.payload.pagination;
        state.lastSearchQuery = state.searchQuery;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.refreshing = false;
        if (action.payload !== "Request already in progress") {
          state.error = action.payload;
        }
      })

      // Load more customers
      .addCase(loadMoreCustomers.pending, (state) => {
        state.isLoadingMore = true;
        state.error = null;
      })
      .addCase(loadMoreCustomers.fulfilled, (state, action) => {
        state.isLoadingMore = false;

        // Merge new customers with existing ones
        const existingIds = new Set(state.customers.map((c) => c.id));
        const newCustomers = action.payload.customers.filter(
          (c) => !existingIds.has(c.id)
        );
        state.customers = [...state.customers, ...newCustomers];

        state.pagination = action.payload.pagination;
      })
      .addCase(loadMoreCustomers.rejected, (state, action) => {
        state.isLoadingMore = false;
        if (action.payload !== "No more data to load") {
          state.error = action.payload;
        }
      })

      // Submit customer
      .addCase(submitCustomer.fulfilled, (state, action) => {
        if (action.payload.isUpdate) {
          state.customers = state.customers.map((customer) =>
            customer.id === action.payload.customer.id
              ? action.payload.customer
              : customer
          );
        } else {
          // Add new customer to beginning of list
          state.customers.unshift(action.payload.customer);
          state.pagination.totalItems += 1;
        }
      })
      .addCase(submitCustomer.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete customer
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
        state.pagination.totalItems = Math.max(
          0,
          state.pagination.totalItems - 1
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setRefreshing,
  clearError,
  setSearchQuery,
  resetPagination,
  reset,
} = customerSlice.actions;
export default customerSlice.reducer;
