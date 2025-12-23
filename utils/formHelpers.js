// Helper function to add images to FormData
export const addImagesToFormData = (formData, images, fieldName, prefix) => {
  if (!images || images.length === 0) return;

  if (Array.isArray(images)) {
    images.forEach((image, index) => {
      formData.append(fieldName, {
        uri: image,
        name: `${prefix}_${index}_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    });
  } else if (typeof images === "string") {
    formData.append(fieldName, {
      uri: images,
      name: `${prefix}_${Date.now()}.jpg`,
      type: "image/jpeg",
    });
  }
};

// Helper function to count total images in FormData
export const countImagesInFormData = (formData) => {
  const imageFields = [
    "album_images[]",
    "contract_images[]",
    "red_book_images[]",
    "plot_image",
    "cover_image",
  ];
  return imageFields.reduce(
    (total, field) => total + formData.getAll(field).length,
    0
  );
};

// Helper function to create FormData from form fields
export const createFormData = (fields) => {
  const formData = new FormData();
  fields.forEach(({ key, value }) => formData.append(key, value));
  return formData;
};

// Helper function to add kept images for update mode
export const addKeptImages = (
  formData,
  keptImages,
  keptContractImages,
  keptRedBookImages
) => {
  formData.append("kept_images", JSON.stringify(keptImages || []));
  formData.append(
    "kept_contract_images",
    JSON.stringify(keptContractImages || [])
  );
  formData.append(
    "kept_red_book_images",
    JSON.stringify(keptRedBookImages || [])
  );
};

// Default form reset data
export const getDefaultFormData = () => ({
  title: "",
  description: "",
  coverImage: null,
  albumImages: [],
  contractImages: [],
  redBookImages: [],
  plotImage: null,
  province: "",
  provinceCode: "",
  ward: "",
  wardCode: "",
  address: "",
  propertyType: "",
  propertyTypeName: "",
  type: "",
  typeName: "",
  area: "",
  priceUnit: "",
  priceUnitName: "",
  priceValue: "",
  commissionValue: "",
  legalStatus: "",
  legalStatusName: "",
  landCertificateNumber: "",
  furniture: "",
  furnitureName: "",
  floors: 0,
  bedrooms: 0,
  bathrooms: 0,
  direction: "",
  directionName: "",
  balconyDirection: "",
  balconyDirectionName: "",
  propertyStatus: "",
  propertyStatusName: "",
  propertyCriteria: [],
  propertyCriteriaNames: [],
  frontage: "",
  roadWidth: "",
  length: "",
  ownerName: "",
  ownerAddress: "",
  ownerPhone: "",
  ownerIdNumber: "",
  status: "Đang xử lý",
});

// Helper function to submit estate form
export const submitEstateForm = async (formData, id, apiPost) => {
  const endpoint = id ? `/estate/update/${id}` : `/estate`;
  return await apiPost(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Helper function to handle form submission errors
export const handleFormError = (error, onRetry) => {
  console.log("Submit error:", error.response?.data?.message);

  if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
    return {
      title: "Timeout",
      message:
        "Yêu cầu bị timeout do tải lên quá nhiều ảnh hoặc kết nối chậm. Vui lòng thử lại hoặc giảm số lượng ảnh.",
      buttons: [{ text: "OK" }, { text: "Thử lại", onPress: onRetry }],
    };
  } else {
    return {
      title: "Thông báo",
      message: error.message,
      buttons: [{ text: "OK" }],
    };
  }
};

// Helper function to validate estate form
export const validateEstateForm = (formData) => {
  const validations = [
    {
      field: "title",
      value: formData.title?.trim(),
      message: "Tiêu đề là bắt buộc.",
    },
    {
      field: "description",
      value: formData.description?.trim(),
      message: "Mô tả là bắt buộc.",
    },
    {
      field: "area",
      value: formData.area,
      message: "Diện tích phải là số lớn hơn 0.",
      validator: (value) =>
        !value || isNaN(parseFloat(value)) || parseFloat(value) <= 0,
    },
    {
      field: "province",
      value: formData.province,
      message: "Vui lòng chọn tỉnh/thành phố.",
    },
    {
      field: "ward",
      value: formData.ward,
      message: "Vui lòng chọn phường/xã.",
    },
    {
      field: "propertyType",
      value: formData.propertyType,
      message: "Vui lòng chọn loại bất động sản.",
    },
    {
      field: "commissionValue",
      value: formData.commissionValue?.trim(),
      message: "HH là bắt buộc.",
    },
    {
      field: "legalStatus",
      value: formData.legalStatus,
      message: "Vui lòng chọn giấy tờ pháp lý.",
    },
    {
      field: "propertyStatus",
      value: formData.propertyStatus,
      message: "Vui lòng chọn trạng thái.",
    },
  ];

  for (const validation of validations) {
    if (validation.validator) {
      if (validation.validator(validation.value)) {
        return { isValid: false, message: validation.message };
      }
    } else if (!validation.value) {
      return { isValid: false, message: validation.message };
    }
  }

  // Kiểm tra số seri sổ đỏ nếu chọn legalStatus = 17 (Sổ đỏ / Sổ hồng)
  if (formData.legalStatus == 17) {
    if (!formData.landCertificateNumber?.trim()) {
      return {
        isValid: false,
        message: "Vui lòng nhập số seri sổ đỏ khi chọn Sổ đỏ / Sổ hồng.",
      };
    }
  }

  return { isValid: true };
};
