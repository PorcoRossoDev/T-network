import { createSlice } from "@reduxjs/toolkit";

const estateSlice = createSlice({
  name: "estate",
  initialState: {
    estates: [], // Danh sách estates
    newEstate: null, // Estate vừa được tạo/cập nhật
    lastAction: null, // 'create', 'update', 'delete', 'toggleFavorite'
    lastActionTime: null, // Timestamp của action cuối cùng
    lastFavoriteToggle: null, // Estate vừa toggle favorite { estateId, isFavorited }
  },
  reducers: {
    // Thêm estate mới vào đầu danh sách
    addEstate: (state, action) => {
      const newEstate = action.payload;
      state.estates = [newEstate, ...state.estates];
      state.newEstate = newEstate;
      state.lastAction = "create";
      state.lastActionTime = Date.now();
    },

    // Cập nhật estate trong danh sách
    updateEstate: (state, action) => {
      const updatedEstate = action.payload;
      // Sử dụng String comparison để tránh type mismatch
      const index = state.estates.findIndex(
        (e) => String(e.id) === String(updatedEstate.id)
      );
      if (index !== -1) {
        state.estates[index] = updatedEstate;
      }
      state.newEstate = updatedEstate;
      state.lastAction = "update";
      state.lastActionTime = Date.now();
    },

    // Xóa estate khỏi danh sách
    deleteEstate: (state, action) => {
      const estateId = action.payload;
      // Sử dụng String comparison để tránh type mismatch
      state.estates = state.estates.filter(
        (e) => String(e.id) !== String(estateId)
      );
      state.newEstate = null;
      state.lastAction = "delete";
      state.lastActionTime = Date.now();
    },

    // Set toàn bộ danh sách estates (dùng khi fetch từ API)
    setEstates: (state, action) => {
      state.estates = action.payload;
    },

    // Toggle favorite status
    toggleFavorite: (state, action) => {
      const { estateId, isFavorited } = action.payload;
      // Cập nhật trong danh sách estates nếu có
      const index = state.estates.findIndex(
        (e) => String(e.id) === String(estateId)
      );
      if (index !== -1) {
        state.estates[index].isFavorited = isFavorited;
      }
      state.lastFavoriteToggle = { estateId, isFavorited };
      state.lastAction = "toggleFavorite";
      state.lastActionTime = Date.now();
    },

    // Clear action flags
    clearLastAction: (state) => {
      state.lastAction = null;
      state.newEstate = null;
      state.lastActionTime = null;
      state.lastFavoriteToggle = null;
    },
  },
});

export const {
  addEstate,
  updateEstate,
  deleteEstate,
  setEstates,
  toggleFavorite,
  clearLastAction,
} = estateSlice.actions;

export default estateSlice.reducer;
