import React, { createContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, disableFaceId } from "../redux/slices/userSlice"; // Import disableFaceId
import { apiPost, apiGet, cancelAllRequests } from "../services/api"; // Import centralized axios
import { Alert } from "react-native";
import notificationServiceWrapper from "../services/notificationServiceWrapper";
import { enableFaceId } from "../redux/slices/userSlice"; // Added import for enableFaceId

// Tạo context cho authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggingOut = useRef(false); // Flag để prevent concurrent logout/login

  // State quản lý trạng thái xác thực
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false); // Thêm state để phân biệt guest user

  // State cho preloaded data
  const [preloadedData, setPreloadedData] = useState({
    hotHouses: [],
    unreadCount: 0,
    isDataReady: false,
  });

  // State cho permissions
  const [permissions, setPermissions] = useState({});
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  /**
   * Reset tất cả state về initial state
   */
  const resetAllState = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsGuest(false);
    setPreloadedData({
      hotHouses: [],
      unreadCount: 0,
      isDataReady: false,
    });
    setPermissions({});
    setPermissionsLoaded(false);
  };

  /**
   * Lấy permissions từ API
   */
  const loadPermissions = async () => {
    try {
      const response = await apiGet("/auth/permissions");
      const userPermissions = response.data || {};

      // Lưu permissions vào state
      setPermissions(userPermissions);
      setPermissionsLoaded(true);
    } catch (error) {
      // Vẫn set permissionsLoaded = true để không block UI
      setPermissionsLoaded(true);
    }
  };

  /**
   * Check permission cho module và action
   */
  const hasPermission = (module, action) => {
    if (!permissionsLoaded || !permissions[module]) {
      return false;
    }
    return permissions[module].includes(action);
  };

  /**
   * Check multiple permissions
   */
  const hasAnyPermission = (module, actions) => {
    if (!permissionsLoaded || !permissions[module]) {
      return false;
    }
    return actions.some((action) => permissions[module].includes(action));
  };

  /**
   * Check all permissions
   */
  const hasAllPermissions = (module, actions) => {
    if (!permissionsLoaded || !permissions[module]) {
      return false;
    }
    return actions.every((action) => permissions[module].includes(action));
  };

  /**
   * Get user permissions for a specific module
   */
  const getModulePermissions = (module) => {
    if (!permissionsLoaded || !permissions[module]) {
      return [];
    }
    return permissions[module];
  };

  /**
   * Preload essential data để tránh loading trên HomeScreen
   */
  const preloadEssentialData = async () => {
    try {
      // Gọi multiple APIs parallel để tăng tốc
      const [hotHousesResponse, unreadCountResponse, permissionsResponse] =
        await Promise.allSettled([
          apiGet("/estate/hot"),
          apiGet("/notifications/unread-count"),
          apiGet("/auth/permissions"),
        ]);

      // Xử lý kết quả hot houses
      const hotHouses =
        hotHousesResponse.status === "fulfilled"
          ? hotHousesResponse.value.data.data || []
          : [];

      // Xử lý kết quả unread count
      const unreadCount =
        unreadCountResponse.status === "fulfilled"
          ? unreadCountResponse.value.data.unread_count || 0
          : 0;

      // Xử lý kết quả permissions
      const userPermissions =
        permissionsResponse.status === "fulfilled"
          ? permissionsResponse.value.data || {}
          : {};

      // Cập nhật preloaded data
      setPreloadedData({
        hotHouses,
        unreadCount,
        isDataReady: true,
      });

      // Cập nhật permissions
      setPermissions(userPermissions);
      setPermissionsLoaded(true);
    } catch (error) {
      // Vẫn set isDataReady = true để không block UI
      setPreloadedData((prev) => ({ ...prev, isDataReady: true }));
      setPermissionsLoaded(true);
    }
  };

  // Kiểm tra trạng thái xác thực khi app khởi động
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");

        if (token) {
          // Làm mới token với server
          const response = await apiPost("/auth/refresh");
          const userData = response.data.user;

          // Lưu token mới và thông tin user
          await AsyncStorage.setItem("jwt_token", response.data.access_token);
          await AsyncStorage.setItem("username", response.data.user.account);

          // Cập nhật Redux và state
          dispatch(login(userData));
          setUser(userData);
          setIsAuthenticated(true);

          // Kiểm tra và khôi phục Face ID state
          try {
            const faceIdEnabled = await AsyncStorage.getItem(
              "biometricEnabled"
            );
            if (faceIdEnabled === "true") {
              dispatch(enableFaceId());
            } else {
              dispatch(disableFaceId());
            }
          } catch (error) {
            console.log("Error checking Face ID state:", error);
          }

          // Đăng ký device token nếu chưa đăng ký
          await registerDeviceTokenIfNeeded();

          // 🔥 Preload data ngay sau khi authenticate thành công
          await preloadEssentialData();
        } else {
          // Không có token, nhưng KHÔNG XÓA Face ID settings
          console.log("No token found, user not authenticated");

          // Chỉ kiểm tra Face ID state mà không xóa
          try {
            const faceIdEnabled = await AsyncStorage.getItem(
              "biometricEnabled"
            );
            if (faceIdEnabled === "true") {
              // Kiểm tra có credentials không
              const username = await AsyncStorage.getItem("username");
              const password = await AsyncStorage.getItem("password");
              if (username && password) {
                // Có credentials và Face ID enabled, keep state
                console.log("Face ID credentials available for next login");
              } else {
                // Không có credentials, tắt Face ID
                await AsyncStorage.setItem("biometricEnabled", "false");
                dispatch(disableFaceId());
              }
            } else {
              dispatch(disableFaceId());
            }
          } catch (error) {
            console.log("Error checking Face ID state:", error);
          }
        }
      } catch (error) {
        console.log("Auth check error:", error);

        if (error.response?.status === 401) {
          // Lỗi 401 - Unauthorized
          console.log("401 Unauthorized error detected");

          // Xóa token cũ
          await AsyncStorage.removeItem("jwt_token");

          // Kiểm tra Face ID settings
          try {
            const faceIdEnabled = await AsyncStorage.getItem(
              "biometricEnabled"
            );
            const username = await AsyncStorage.getItem("username");
            const password = await AsyncStorage.getItem("password");

            if (faceIdEnabled === "true" && username && password) {
              console.log("Preserving Face ID settings with credentials");
              // Giữ Face ID settings và credentials
            } else {
              // Nếu không có credentials đầy đủ, clean up
              await AsyncStorage.setItem("biometricEnabled", "false");
              dispatch(disableFaceId());
            }
          } catch (storageError) {
            console.log("Error handling Face ID state:", storageError);
          }

          resetAllState();

          // Hiển thị thông báo lỗi rõ ràng hơn
          if (error.message && !error.message.includes("Invalid token")) {
            console.log("401 Error details:", error.message);
          }
        } else {
          // Lỗi khác (như 500), KHÔNG XÓA Face ID settings
          console.log(
            "Server error, preserving Face ID settings:",
            error.response?.status
          );

          // Vẫn kiểm tra Face ID state nhưng không xóa
          try {
            const faceIdEnabled = await AsyncStorage.getItem(
              "biometricEnabled"
            );
            if (faceIdEnabled === "true") {
              console.log(
                "Face ID still enabled, preserving for next login attempt"
              );
            }
          } catch (storageError) {
            console.log("Error checking Face ID state:", storageError);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  /**
   * Đăng ký device token nếu chưa đăng ký
   */
  const registerDeviceTokenIfNeeded = async () => {
    try {
      const isRegistered =
        await notificationServiceWrapper.isDeviceRegistered();
      if (!isRegistered) {
        await notificationServiceWrapper.registerDeviceToken();
      }
    } catch (error) {
      // Silent error handling for production
    }
  };

  /**
   * Đăng nhập người dùng với data preloading
   */
  const loginUser = async (account, password) => {
    // Prevent login khi đang logout
    if (isLoggingOut.current) {
      return { success: false, error: "Đang đăng xuất, vui lòng đợi..." };
    }

    try {
      // Lưu Face ID state trước khi reset (chỉ lưu nếu đang enabled)
      const currentFaceIdEnabled = await AsyncStorage.getItem(
        "biometricEnabled"
      );
      const preserveFaceId = currentFaceIdEnabled === "true";

      // Reset state trước khi login
      resetAllState();

      // Xóa token cũ trước khi đăng nhập
      await AsyncStorage.removeItem("jwt_token");

      // 🔧 Cleanup device token cũ để tránh duplicate constraint
      try {
        await notificationServiceWrapper.unregisterDeviceToken();
      } catch (deviceError) {
        // Silent error handling for production
      }

      // Gọi API đăng nhập
      const response = await apiPost("/login", { account, password });
      const userData = response.data.user;

      // Lưu thông tin xác thực
      await AsyncStorage.setItem("jwt_token", response.data.access_token);
      await AsyncStorage.setItem("username", account);
      await AsyncStorage.setItem("password", password);

      // Cập nhật Redux và state
      dispatch(login(userData));
      setUser(userData);
      setIsAuthenticated(true);

      // Khôi phục Face ID state sau khi login thành công (nếu có)
      if (preserveFaceId) {
        dispatch(enableFaceId());
      } else {
        dispatch(disableFaceId());
      }

      // 🔥 Parallel: Device registration + Data preloading
      const [deviceResult] = await Promise.allSettled([
        notificationServiceWrapper.registerDeviceToken(),
        preloadEssentialData(), // Preload data ngay sau login
      ]);

      if (deviceResult.status === "rejected") {
        // Silent error handling for production
      }

      return { success: true };
    } catch (error) {
      // Reset state nếu login fail
      resetAllState();
      // Đảm bảo Face ID bị tắt khi login fail
      dispatch(disableFaceId());

      Alert.alert("Thông báo", error.message);
      return { success: false, error: error.message };
    }
  };

  /**
   * Đăng nhập với tư cách khách
   */
  const loginAsGuest = async () => {
    try {
      // Reset state trước khi login guest
      resetAllState();

      // Tạo guest user object
      const guestUser = {
        id: "guest",
        account: "guest",
        name: "Khách",
        role: "guest",
        permissions: {
          // Guest chỉ có quyền xem cơ bản
          estate: ["view"],
          project: ["view"],
          blog: ["view"],
        },
      };

      // Cập nhật state cho guest
      setUser(guestUser);
      setIsAuthenticated(true);
      setIsGuest(true);

      // Set permissions cho guest
      setPermissions(guestUser.permissions);
      setPermissionsLoaded(true);

      // Preload data cơ bản cho guest (chỉ public data)
      await preloadGuestData();

      return { success: true };
    } catch (error) {
      console.log("Guest login error:", error);
      resetAllState();
      return { success: false, error: error.message };
    }
  };

  /**
   * Preload data cơ bản cho guest user
   */
  const preloadGuestData = async () => {
    try {
      // Chỉ load public data, không cần authentication
      const [hotHousesResponse] = await Promise.allSettled([
        apiGet("/estate/hot"),
      ]);

      // Xử lý kết quả hot houses
      const hotHouses =
        hotHousesResponse.status === "fulfilled"
          ? hotHousesResponse.value.data.data || []
          : [];

      // Cập nhật preloaded data
      setPreloadedData({
        hotHouses,
        unreadCount: 0, // Guest không có notification
        isDataReady: true,
      });
    } catch (error) {
      // Vẫn set isDataReady = true để không block UI
      setPreloadedData((prev) => ({ ...prev, isDataReady: true }));
    }
  };

  /**
   * Đăng xuất người dùng với complete cleanup (giữ Face ID settings và credentials nếu Face ID enabled)
   */
  const logoutUser = async () => {
    // Prevent concurrent logout calls
    if (isLoggingOut.current) {
      return { success: true };
    }

    isLoggingOut.current = true;

    // Cancel all active API requests to prevent race conditions
    cancelAllRequests();

    try {
      // Hủy đăng ký device token trước khi đăng xuất
      try {
        await notificationServiceWrapper.unregisterDeviceToken();
      } catch (error) {
        // Tiếp tục đăng xuất dù hủy đăng ký thất bại
      }

      // Gọi API đăng xuất
      try {
        await apiPost("/auth/logout", {});
      } catch (error) {
        // Tiếp tục local logout dù server logout fail
      }
    } catch (error) {
      // Không return error - vẫn tiếp tục local cleanup
    }

    // Clean up local data và reset state
    try {
      // Kiểm tra xem Face ID có được bật không
      const biometricEnabled = await AsyncStorage.getItem("biometricEnabled");
      const hasAskedFaceIdSetup = await AsyncStorage.getItem(
        "hasAskedFaceIdSetup"
      );

      if (biometricEnabled === "true") {
        // Nếu Face ID được bật, chỉ xóa JWT token, GIỮ LẠI username và password
        await AsyncStorage.removeItem("jwt_token");
        // GIỮ LẠI: username, password, biometricEnabled, hasAskedFaceIdSetup
      } else {
        // Nếu Face ID không được bật, xóa hết auth data
        await AsyncStorage.multiRemove(["jwt_token", "username", "password"]);
        // GIỮ LẠI: hasAskedFaceIdSetup để không hỏi lại
      }

      // Reset Redux state - quan trọng: phải tắt Face ID trong Redux SESSION
      dispatch({ type: "user/logout" }); // Đã có disableFaceId trong logout reducer
      dispatch({ type: "customers/reset" }); // Reset customers slice
      dispatch({ type: "clients/reset" }); // Reset clients slice
      dispatch({ type: "estateForm/resetForm" }); // Reset estate form slice
      dispatch({ type: "notification/reset" }); // Reset notification slice

      // Tắt Face ID trong Redux SESSION (không ảnh hưởng đến AsyncStorage)
      dispatch(disableFaceId());

      // Reset local state
      resetAllState();

      return { success: true };
    } catch (error) {
      // Force reset anyway
      resetAllState();
      // Đảm bảo Face ID bị tắt dù có lỗi
      dispatch(disableFaceId());
      return { success: false, error: error.message };
    } finally {
      isLoggingOut.current = false;
    }
  };

  /**
   * Xóa hoàn toàn tất cả data including Face ID settings (dùng khi clear all data)
   */
  const clearAllData = async () => {
    try {
      // Xóa TẤT CẢ dữ liệu
      await AsyncStorage.multiRemove([
        "jwt_token",
        "username",
        "password",
        "biometricEnabled", // Xóa Face ID setting
        "hasAskedFaceIdSetup", // Xóa flag đã hỏi setup Face ID
      ]);

      // Reset Redux state
      dispatch({ type: "user/logout" });
      dispatch({ type: "customers/reset" });
      dispatch({ type: "clients/reset" });
      dispatch({ type: "estateForm/resetForm" });
      dispatch({ type: "notification/reset" });
      dispatch(disableFaceId());

      // Reset local state
      resetAllState();

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * Refresh preloaded data manually
   */
  const refreshPreloadedData = async () => {
    await preloadEssentialData();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        isGuest, // Expose guest state
        loginUser,
        loginAsGuest, // Expose guest login function
        logoutUser,
        clearAllData, // Expose clear all data function
        preloadedData, // Expose preloaded data
        refreshPreloadedData, // Expose refresh function

        // Permissions
        permissions,
        permissionsLoaded,
        loadPermissions,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        getModulePermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
