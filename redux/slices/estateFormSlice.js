import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Async thunk to submit form data
export const submitEstateForm = createAsyncThunk(
  "estateForm/submitEstateForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://khohangdiaoc.diaocvang.vn/api/v1/estate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.errors);
    }
  }
);

const estateFormSlice = createSlice({
  name: "estateForm",
  initialState: {
    title:
      "60 CĂN URBAN GREEN CHO THUÊ| ĐỦ DIỆN TÍCH| NHÀ MỚI 100%| TIỆN ÍCH RESORT| Ở NGAY| VP CTY TẠI DỰ ÁN",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    coverImage: null, // Ảnh đại diện
    albumImages: [], // Album ảnh
    province: "Thành phố Đà Nẵng",
    district: "Quận Hải Châu",
    ward: "Phường Hải Châu",
    address: "Dự án Urban Green",
    propertyType: "Căn hộ chung cư", // Loại BĐS
    propertyTypeName: "Căn hộ chung cư",
    area: "82.5", // Diện tích
    priceUnit: "VND", // Đơn vị giá
    priceUnitName: "VND",
    priceValue: "3200000000", // Giá
    commissionValue: "5", // Giá trị trích thưởng
    commissionUnit: "%", // Đơn vị giá trị trích thưởng
    commissionUnitName: "%",
    legalStatus: "Sổ đỏ / Sổ hồng", // Giấy tờ pháp lý
    legalStatusName: "Sổ đỏ / Sổ hồng",
    landCertificateNumber: "145614898", // Số seri sổ đỏ
    furniture: "Nội thất cơ bản", // Nội thất
    furnitureName: "Nội thất cơ bản",
    floors: 5, // Số tầng
    bedrooms: 6, // Số phòng ngủ
    bathrooms: 4, // Số phòng tắm
    direction: "Đông", // Hướng nhà
    directionName: "Đông",
    balconyDirection: "Tây", // Hướng ban công
    balconyDirectionName: "Tây",
    propertyStatus: "Mới", // Trạng thái
    propertyStatusName: "Mới",
    propertyCriteria: [], // Tiêu chí bất động sản (mảng để chọn nhiều)
    propertyCriteriaNames: [],
    frontage: "5", // Mặt tiền (m)
    roadWidth: "5", // Đường trước nhà (m)
    length: "16.5", // Chiều dài (m)
    ownerName: "Nguyễn Văn A", // Tên chủ nhà
    ownerAddress: "Kim Mã - Ba Đình - Hà Nội", //Địa chỉ chủ nhà
    ownerPhone: "0348464081", //SDT chủ nhà
    ownerIdNumber: "145614898", //CCCD chủ nhà
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      return {
        ...state,
        ...estateFormSlice.getInitialState(),
        loading: false,
        error: null,
        success: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEstateForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitEstateForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitEstateForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, resetForm } = estateFormSlice.actions;
export default estateFormSlice.reducer;
