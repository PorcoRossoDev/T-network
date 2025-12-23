import * as Device from "expo-device";
import { Platform } from "react-native";
import { apiPost, apiGet } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Lazy load expo-notifications chỉ khi cần
let Notifications = null;

const loadExpoNotifications = () => {
  if (!Notifications && Platform.OS === "ios") {
    try {
      Notifications = require("expo-notifications");

      // Cấu hình hành vi thông báo khi nhận notification (chỉ cho iOS)
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true, // Hiển thị alert
          shouldPlaySound: true, // Phát âm thanh
          shouldSetBadge: false, // Không hiển thị badge
        }),
      });

      console.log("✅ Expo notifications loaded for iOS");
    } catch (error) {
      console.log("⚠️ Cannot load expo-notifications:", error.message);
      return false;
    }
  }
  return !!Notifications;
};

class NotificationService {
  constructor() {
    this.deviceToken = null; // Token thiết bị để nhận push notification
    this.isRegistered = false; // Trạng thái đăng ký với server
    this.navigationRef = null; // Tham chiếu đến navigation để điều hướng
    this.initialNotificationHandled = false; // Theo dõi notification đã được xử lý
  }

  /**
   * Thiết lập tham chiếu navigation để xử lý điều hướng
   */
  setNavigationRef(navigationRef) {
    this.navigationRef = navigationRef;
  }

  /**
   * Yêu cầu quyền thông báo từ người dùng
   */
  async requestPermissions() {
    try {
      // Chỉ hoạt động trên iOS
      if (Platform.OS !== "ios") {
        console.log("ℹ️ Expo notifications chỉ hỗ trợ iOS");
        return false;
      }

      // Load expo-notifications nếu chưa load
      if (!loadExpoNotifications()) {
        console.log("⚠️ Không thể load expo-notifications");
        return false;
      }

      // Chỉ hoạt động trên thiết bị thật
      if (Device.isDevice) {
        // Kiểm tra quyền hiện tại
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // Nếu chưa có quyền, yêu cầu quyền
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        // Kiểm tra kết quả
        if (finalStatus !== "granted") {
          console.log("⚠️ Quyền thông báo bị từ chối");
          return false;
        }

        return true;
      } else {
        console.log("⚠️ Cần thiết bị thật để sử dụng Push Notifications");
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Lấy token thiết bị để nhận push notification
   */
  async getDeviceToken() {
    try {
      // Chỉ hoạt động trên iOS
      if (Platform.OS !== "ios") {
        console.log("ℹ️ Expo notifications chỉ hỗ trợ iOS");
        return null;
      }

      // Kiểm tra thiết bị thật
      if (!Device.isDevice) {
        return null;
      }

      // Kiểm tra token đã lưu
      const storedToken = await AsyncStorage.getItem("device_push_token");
      if (storedToken) {
        this.deviceToken = storedToken;
        return storedToken;
      }

      // Yêu cầu quyền trước khi lấy token
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return null;
      }

      // Load expo-notifications nếu chưa load
      if (!loadExpoNotifications()) {
        console.log("⚠️ Không thể load expo-notifications");
        return null;
      }

      // Lấy Expo push token
      console.log(
        "🔍 iOS: Đang lấy Expo push token với projectId:",
        "324cf50d-384e-4abf-8622-c99c79af23de"
      );
      const tokenResult = await Notifications.getExpoPushTokenAsync({
        projectId: "324cf50d-384e-4abf-8622-c99c79af23de", // Từ app.json eas.projectId
      });

      console.log("🔍 iOS: Token result:", tokenResult);

      // Lưu token nếu thành công
      if (tokenResult?.data) {
        this.deviceToken = tokenResult.data;
        await AsyncStorage.setItem("device_push_token", tokenResult.data);
        console.log(
          "✅ Lấy device token thành công:",
          tokenResult.data.substring(0, 20) + "..."
        );
        return tokenResult.data;
      } else {
        console.log("❌ iOS: Token result không có data");
        return null;
      }
    } catch (error) {
      console.log("❌ Lỗi khi lấy device token:", error);
      return null;
    }
  }

  /**
   * Kiểm tra kết nối API với server
   */
  async testAPIConnection() {
    try {
      // Thử gọi API profile để kiểm tra kết nối
      const testResponse = await apiGet("/auth/profile");
      console.log("✅ Kết nối API thành công");
      return true;
    } catch (error) {
      console.log("❌ Không thể kết nối API:", error);
      return false;
    }
  }

  /**
   * Helper method để register device token với retry logic
   */
  async registerDeviceTokenWithRetry(deviceInfo, maxRetries = 2) {
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `🔄 Device token registration attempt ${attempt}/${maxRetries}`
        );

        const response = await apiPost("/user/register-device", deviceInfo);

        if (
          response.data &&
          (response.data.success === true ||
            response.status === 200 ||
            response.status === 201)
        ) {
          console.log(
            `✅ Device token registered successfully on attempt ${attempt}`
          );
          return { success: true, response };
        } else {
          throw new Error(response.data?.message || "Registration failed");
        }
      } catch (error) {
        lastError = error;
        console.log(
          `❌ Registration attempt ${attempt} failed:`,
          error.message
        );

        // Nếu gặp lỗi duplicate và chưa hết retry
        if (
          error.response?.status === 500 &&
          error.response?.data?.message?.includes("Duplicate entry") &&
          attempt < maxRetries
        ) {
          console.log(
            `⚠️ Duplicate device token detected, cleaning up before retry...`
          );

          try {
            // Unregister device token cũ
            await this.unregisterDeviceToken();

            // Đợi một chút để server xử lý
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Tiếp tục với attempt tiếp theo
            continue;
          } catch (cleanupError) {
            console.log("❌ Cleanup failed:", cleanupError.message);
            // Vẫn tiếp tục retry
          }
        }

        // Nếu không phải duplicate error hoặc đã hết retry
        if (attempt === maxRetries) {
          break;
        }

        // Đợi trước khi retry
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    return { success: false, error: lastError };
  }

  /**
   * Đăng ký device token với server
   */
  async registerDeviceToken() {
    try {
      // Chỉ hoạt động trên iOS
      if (Platform.OS !== "ios") {
        console.log("ℹ️ Expo device token registration chỉ hỗ trợ iOS");
        return false;
      }

      // Lấy token thiết bị
      const token = await this.getDeviceToken();

      if (!token) {
        console.log("❌ Không có device token để đăng ký");
        return false;
      }

      // Kiểm tra kết nối API trước
      const canConnect = await this.testAPIConnection();
      if (!canConnect) {
        console.log("❌ Không thể kết nối API, bỏ qua đăng ký");
        return false;
      }

      // Chuẩn bị thông tin thiết bị
      const deviceInfo = {
        device_token: token,
        device_type: Platform.OS, // 'ios' hoặc 'android'
        device_name: Device.deviceName || "Unknown Device",
        device_brand: Device.brand || "Unknown Brand",
        device_model: Device.modelName || "Unknown Model",
        os_version: Device.osVersion || "Unknown Version",
        app_version: "1.0.0",
        force_update: true, // Cho phép update device token cho user mới
      };

      // Sử dụng helper method với retry logic
      const result = await this.registerDeviceTokenWithRetry(deviceInfo);

      if (result.success) {
        this.isRegistered = true;
        await AsyncStorage.setItem("device_registered", "true");
        console.log("✅ Đăng ký device token thành công");
        return true;
      } else {
        console.log(
          "❌ Đăng ký device token thất bại sau tất cả attempts:",
          result.error?.message
        );
        return false;
      }
    } catch (error) {
      console.log("❌ Lỗi khi đăng ký device token:", error.message);
      return false;
    }
  }

  /**
   * Hủy đăng ký device token khỏi server
   */
  async unregisterDeviceToken() {
    try {
      // Chỉ hoạt động trên iOS
      if (Platform.OS !== "ios") {
        console.log("ℹ️ Expo device token unregistration chỉ hỗ trợ iOS");
        return false;
      }

      // Lấy token từ bộ nhớ nếu cần
      if (!this.deviceToken) {
        const storedToken = await AsyncStorage.getItem("device_push_token");
        if (storedToken) {
          this.deviceToken = storedToken;
        }
      }

      // Gọi API hủy đăng ký nếu có token
      if (this.deviceToken) {
        try {
          const response = await apiPost("/user/unregister-device", {
            device_token: this.deviceToken,
          });

          if (response.status === 200 || response.status === 201) {
            console.log("✅ Hủy đăng ký device token thành công");
          } else {
            console.log(
              "⚠️ Hủy đăng ký device token có warning:",
              response.data?.message
            );
          }
        } catch (apiError) {
          // Nếu lỗi 404 hoặc token không tồn tại, vẫn coi như thành công
          if (apiError.response?.status === 404) {
            console.log(
              "ℹ️ Device token không tồn tại trên server (đã bị xóa)"
            );
          } else {
            console.log(
              "❌ Lỗi API khi hủy đăng ký device token:",
              apiError.message
            );
            // Vẫn tiếp tục cleanup local để tránh stuck state
          }
        }
      }

      // Xóa dữ liệu local trong mọi trường hợp
      await AsyncStorage.multiRemove([
        "device_push_token",
        "device_registered",
      ]);

      this.deviceToken = null;
      this.isRegistered = false;

      console.log("✅ Cleanup device token local data hoàn tất");
      return true;
    } catch (error) {
      console.log("❌ Lỗi khi hủy đăng ký device token:", error);

      // Force cleanup local data ngay cả khi có lỗi
      try {
        await AsyncStorage.multiRemove([
          "device_push_token",
          "device_registered",
        ]);
        this.deviceToken = null;
        this.isRegistered = false;
        console.log("✅ Force cleanup device token local data");
      } catch (cleanupError) {
        console.log("❌ Force cleanup cũng thất bại:", cleanupError);
      }

      return false;
    }
  }

  /**
   * Kiểm tra thiết bị đã được đăng ký chưa
   */
  async isDeviceRegistered() {
    try {
      // Chỉ hoạt động trên iOS
      if (Platform.OS !== "ios") {
        console.log("ℹ️ Expo device registration check chỉ hỗ trợ iOS");
        return false;
      }

      const registered = await AsyncStorage.getItem("device_registered");
      return registered === "true";
    } catch (error) {
      console.log("❌ Lỗi khi kiểm tra trạng thái đăng ký:", error);
      return false;
    }
  }

  /**
   * Thiết lập các listener để lắng nghe thông báo
   */
  setupNotificationListeners() {
    // Chỉ hoạt động trên iOS
    if (Platform.OS !== "ios") {
      console.log("ℹ️ Expo notification listeners chỉ hỗ trợ iOS");
      return () => {}; // Return empty cleanup function
    }

    // Load expo-notifications nếu chưa load
    if (!loadExpoNotifications()) {
      console.log("⚠️ Không thể load expo-notifications");
      return () => {};
    }

    // Xử lý thông báo nhận được khi app đang mở
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        const { title, body } = notification.request.content;
        console.log(`📱 Thông báo mới: ${title} - ${body}`);
      });

    // Xử lý khi người dùng chạm vào thông báo
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationData = response.notification.request.content.data;
        const { title } = response.notification.request.content;

        console.log(`🔔 Người dùng chạm thông báo: ${title}`);

        // Điều hướng dựa trên dữ liệu thông báo
        if (notificationData) {
          this.handleNotificationNavigation(notificationData);
        }
      });

    // Trả về hàm cleanup
    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }

  /**
   * Xử lý điều hướng dựa trên dữ liệu thông báo
   */
  handleNotificationNavigation(data) {
    // Kiểm tra navigation có sẵn không
    if (!this.navigationRef?.current) {
      console.log("⏳ Navigation chưa sẵn sàng, lưu thông báo để xử lý sau");
      AsyncStorage.setItem("pending_notification_data", JSON.stringify(data));
      return;
    }

    console.log("🧭 Xử lý điều hướng thông báo:", data);

    try {
      // Điều hướng dựa trên loại thông báo
      if (data.estate_id && data.is_system == 1) {
        // Điều hướng đến chi tiết bất động sản
        console.log(`🏠 Chuyển đến Comment với ID: ${data.estate_id}`);
        this.navigationRef.current.navigate("Comment", {
          estateId: parseInt(data.estate_id),
        });
      } else if (data.notification_id && data.is_system == 0) {
        // Điều hướng đến chi tiết thông báo hệ thống
        console.log(
          `📋 Chuyển đến NotificationDetail với ID: ${data.notification_id}`
        );
        this.navigationRef.current.navigate("NotificationDetail", {
          id: parseInt(data.notification_id),
        });
      } else if (data.estate_id && data.is_system == 2) {
        // Xử lý thông báo bình luận
        console.log(
          `💬 Chuyển đến ProjectDetail xem chi tiết: ${data.estate_id}`
        );
        this.navigationRef.current.navigate("ProjectDetail", {
          id: parseInt(data.estate_id),
        });
      } else {
        // Xử lý thông báo hệ thống
        console.log("🔔 Chuyển đến danh sách thông báo hệ thống");
        this.navigationRef.current.navigate("Notification");
      }
    } catch (error) {
      console.errologr("❌ Lỗi khi điều hướng từ thông báo:", error);
      // Fallback: chuyển đến danh sách thông báo
      try {
        this.navigationRef.current.navigate("Notification");
      } catch (fallbackError) {
        console.log("❌ Điều hướng fallback cũng thất bại:", fallbackError);
      }
    }
  }

  /**
   * Kiểm tra và xử lý thông báo chờ xử lý (gọi sau khi navigation sẵn sàng)
   */
  async handlePendingNotifications() {
    try {
      const pendingData = await AsyncStorage.getItem(
        "pending_notification_data"
      );
      if (pendingData) {
        const data = JSON.parse(pendingData);
        console.log("📥 Xử lý thông báo chờ:", data);

        // Xóa dữ liệu chờ
        await AsyncStorage.removeItem("pending_notification_data");

        // Xử lý điều hướng
        this.handleNotificationNavigation(data);
      }
    } catch (error) {
      console.log("❌ Lỗi khi xử lý thông báo chờ:", error);
    }
  }

  /**
   * Lấy device token hiện tại
   */
  getCurrentDeviceToken() {
    return this.deviceToken;
  }
}

// Tạo instance duy nhất để sử dụng toàn ứng dụng
const notificationService = new NotificationService();

export default notificationService;
