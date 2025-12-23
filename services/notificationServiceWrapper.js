import { Platform } from "react-native";
import notificationService from "./notificationService";

class NotificationServiceWrapper {
  constructor() {
    this.currentService = null;
    this.isInitialized = false;
    this.initializeService();
  }

  /**
   * Khởi tạo service dựa trên platform
   */
  async initializeService() {
    if (Platform.OS === "ios") {
      // iOS sử dụng Expo notifications
      this.currentService = notificationService;
      console.log("🔧 Sử dụng Expo Notification Service cho iOS");
    } else {
      // Android không có notifications
      this.currentService = null;
      console.log("ℹ️ Android không hỗ trợ notifications");
    }

    this.isInitialized = true;
    console.log("✅ Notification service initialized");
  }

  /**
   * Thiết lập tham chiếu navigation
   */
  setNavigationRef(navigationRef) {
    if (this.currentService) {
      this.currentService.setNavigationRef(navigationRef);
    }
  }

  /**
   * Yêu cầu quyền thông báo
   */
  async requestPermissions() {
    if (this.currentService) {
      return await this.currentService.requestPermissions();
    }
    return false;
  }

  /**
   * Lấy device token
   */
  async getDeviceToken() {
    if (this.currentService) {
      return await this.currentService.getDeviceToken();
    }
    return null;
  }

  /**
   * Đăng ký device token với server
   */
  async registerDeviceToken() {
    if (this.currentService) {
      return await this.currentService.registerDeviceToken();
    }
    return false;
  }

  /**
   * Hủy đăng ký device token
   */
  async unregisterDeviceToken() {
    if (this.currentService) {
      return await this.currentService.unregisterDeviceToken();
    }
    return false;
  }

  /**
   * Kiểm tra thiết bị đã đăng ký
   */
  async isDeviceRegistered() {
    if (this.currentService) {
      return await this.currentService.isDeviceRegistered();
    }
    return false;
  }

  /**
   * Thiết lập notification listeners
   */
  setupNotificationListeners() {
    if (this.currentService) {
      return this.currentService.setupNotificationListeners();
    }
    return () => {};
  }

  /**
   * Xử lý điều hướng từ notification
   */
  handleNotificationNavigation(data) {
    if (this.currentService) {
      this.currentService.handleNotificationNavigation(data);
    }
  }

  /**
   * Xử lý thông báo chờ
   */
  async handlePendingNotifications() {
    if (this.currentService) {
      return await this.currentService.handlePendingNotifications();
    }
  }

  /**
   * Lấy device token hiện tại
   */
  getCurrentDeviceToken() {
    if (this.currentService) {
      return this.currentService.getCurrentDeviceToken();
    }
    return null;
  }

  /**
   * Lấy thông tin về service hiện tại
   */
  getCurrentServiceInfo() {
    if (!this.currentService) {
      return {
        name: "No Notification Service Available",
        platform: Platform.OS,
        type: "none",
        message:
          Platform.OS === "ios"
            ? "iOS notifications available"
            : "Android notifications not supported",
      };
    }

    return {
      name: "Expo Notifications",
      platform: "iOS",
      type: "expo-ios",
    };
  }

  /**
   * Kiểm tra service có sẵn sàng
   */
  async isServiceReady() {
    return this.currentService !== null;
  }

  /**
   * Debug service status
   */
  async debugServiceStatus() {
    return {
      platform: Platform.OS,
      isInitialized: this.isInitialized,
      currentService: this.currentService
        ? this.currentService.constructor.name
        : "None",
      serviceInfo: this.getCurrentServiceInfo(),
      notificationsSupported: Platform.OS === "ios",
    };
  }
}

// Tạo instance duy nhất
const notificationServiceWrapper = new NotificationServiceWrapper();

export default notificationServiceWrapper;
