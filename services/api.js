import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://server.scenthomes.vn/api/v1";

// Create axios instance with timeout
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store for active requests to cancel them when needed
const activeRequests = new Set();

// Request interceptor to add JWT token and track requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("jwt_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Track this request for potential cancellation
      if (config.cancelToken) {
        activeRequests.add(config.cancelToken);
      }
    } catch (error) {}
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    // Remove request from active set on success
    if (response.config.cancelToken) {
      activeRequests.delete(response.config.cancelToken);
    }
    return response;
  },
  (error) => {
    // Remove request from active set on error
    if (error.config?.cancelToken) {
      activeRequests.delete(error.config.cancelToken);
    }

    // Handle axios cancellation
    if (axios.isCancel(error)) {
      console.log("Request cancelled:", error.message);
      return Promise.reject({
        ...error,
        message: "Request cancelled",
        cancelled: true,
      });
    }

    let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
    console.log("error", error);

    if (error.response) {
      if (error.response.status === 401) {
        // Lỗi 401 - Unauthorized
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else {
          errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
        }
        console.log("401 Error details:", error.response.data);
      } else if (error.response.status === 404) {
        errorMessage =
          error.response.data.error || "Không tìm thấy tài nguyên.";
      } else if (error.response.status === 422) {
        errorMessage = Object.values(error.response.data.errors)
          .flat()
          .join("\n");
      } else if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    } else if (error.request) {
      // Check if it's a timeout error
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        errorMessage =
          "Yêu cầu bị timeout. Vui lòng kiểm tra kết nối mạng và thử lại.";
      } else {
        errorMessage =
          "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.";
      }
    }

    // Return error with formatted message for components to handle
    return Promise.reject({ ...error, message: errorMessage });
  }
);

// Cancel all active requests
export const cancelAllRequests = () => {
  console.log(`🚫 Cancelling ${activeRequests.size} active requests`);
  activeRequests.forEach((cancelToken) => {
    if (cancelToken.cancel) {
      cancelToken.cancel("Operation cancelled due to logout");
    }
  });
  activeRequests.clear();
};

// Utility functions for HTTP methods with optional cancel token
export const apiGet = (url, config = {}) => {
  const cancelToken = axios.CancelToken.source();
  return api.get(url, { ...config, cancelToken: cancelToken.token });
};

export const apiPost = (url, data, config = {}) => {
  const cancelToken = axios.CancelToken.source();
  return api.post(url, data, { ...config, cancelToken: cancelToken.token });
};

export const apiPut = (url, data, config = {}) => {
  const cancelToken = axios.CancelToken.source();
  return api.put(url, data, { ...config, cancelToken: cancelToken.token });
};

export const apiDelete = (url, config = {}) => {
  const cancelToken = axios.CancelToken.source();
  return api.delete(url, { ...config, cancelToken: cancelToken.token });
};

// Utility function to create request with custom cancel token
export const createRequestWithCancel = (method, url, data, config = {}) => {
  const cancelToken = axios.CancelToken.source();
  const request = api[method](url, data, {
    ...config,
    cancelToken: cancelToken.token,
  });

  return {
    request,
    cancel: () => cancelToken.cancel("Operation cancelled by user"),
  };
};

export const uploadImageToServer = async (uri) => {
  const formData = new FormData();
  formData.append("image", {
    uri,
    name: `image_${Date.now()}.jpg`,
    type: "image/jpeg",
  });
  const response = await apiPost("/estate/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return response.data.url;
};
//method upload nhiều ảnh
export const uploadMultipleImagesToServer = async (uris) => {
  try {
    console.log("📤 [Upload] Starting upload for", uris.length, "images");

    // If only 1-2 images, use individual upload directly
    if (uris.length <= 2) {
      console.log("📤 [Upload] Using individual upload for small batch");
      const uploadedUrls = [];
      for (let i = 0; i < uris.length; i++) {
        try {
          const url = await uploadImageToServer(uris[i]);
          uploadedUrls.push(url);
          console.log(`✅ [Upload] Individual ${i + 1}/${uris.length} success`);
        } catch (individualError) {
          console.error(
            `❌ [Upload] Individual ${i + 1}/${uris.length} failed:`,
            individualError.message
          );
          throw new Error(
            `Upload failed at image ${i + 1}: ${individualError.message}`
          );
        }
      }
      console.log("✅ [Upload] All individual uploads completed");
      return uploadedUrls;
    }

    // Try batch upload for larger sets
    const formData = new FormData();

    for (let idx = 0; idx < uris.length; idx++) {
      const uri = uris[idx];
      // Ensure URI is valid
      if (!uri || typeof uri !== "string") {
        console.warn(`Invalid URI at index ${idx}:`, uri);
        continue;
      }

      // Get file extension from URI
      const fileExtension = uri.split(".").pop()?.toLowerCase() || "jpg";
      const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";

      formData.append("images[]", {
        uri: uri,
        name: `image_${Date.now()}_${idx}.${fileExtension}`,
        type: mimeType,
      });
    }

    console.log("📤 [Upload] FormData created with", uris.length, "images");

    // Debug: Log each image details
    uris.forEach((uri, idx) => {
      const fileExtension = uri.toLowerCase().includes(".png") ? "png" : "jpg";
      const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";
      console.log(`📷 [Upload] Image ${idx + 1}:`, {
        uri: uri.substring(0, 50) + "...", // Truncate for readability
        name: `image_${Date.now()}_${idx}.${fileExtension}`,
        type: mimeType,
        size: "unknown", // We don't have size info here
      });
    });

    try {
      const response = await apiPost("/estate/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // Shorter timeout for batch to fallback faster
      });

      if (!response.data || !response.data.urls) {
        throw new Error("Invalid response from server");
      }

      console.log(
        "✅ [Upload] Batch success:",
        response.data.urls,
        "URLs received"
      );
      return response.data.urls;
    } catch (batchError) {
      console.warn(
        "⚠️ [Upload] Batch upload failed (server limitation), using individual uploads:",
        batchError.message
      );

      // Fallback: Upload images one by one
      const uploadedUrls = [];
      for (let i = 0; i < uris.length; i++) {
        try {
          const url = await uploadImageToServer(uris[i]);
          uploadedUrls.push(url);
          console.log(`✅ [Upload] Individual ${i + 1}/${uris.length} success`);
        } catch (individualError) {
          console.error(
            `❌ [Upload] Individual ${i + 1}/${uris.length} failed:`,
            individualError.message
          );
          throw new Error(
            `Upload failed at image ${i + 1}: ${individualError.message}`
          );
        }
      }

      console.log("✅ [Upload] All individual uploads completed");
      return uploadedUrls;
    }
  } catch (error) {
    console.error("❌ [Upload] Complete failure:", error);

    // More detailed error message
    let errorMessage = "Upload failed";
    if (error.response?.status === 500) {
      errorMessage = "Server error - please try again later";
    } else if (error.response?.status === 413) {
      errorMessage = "Images too large - please select smaller images";
    } else if (error.message?.includes("Network Error")) {
      errorMessage = "Network connection error";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};
export default api;
