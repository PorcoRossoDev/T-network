import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppNavigator from "./navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { AuthProvider } from "./context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";
import notificationServiceWrapper from "./services/notificationServiceWrapper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// Ngăn splash screen tự động ẩn
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Tải fonts từ assets
  const [fontsLoaded] = useFonts({
    sfregular: require('./assets/fonts/SF-Pro-Display/SF-Pro-Display-Regular.otf'),
    sfmedium: require('./assets/fonts/SF-Pro-Display/SF-Pro-Display-Medium.otf'),
    sfbold: require('./assets/fonts/SF-Pro-Display/SF-Pro-Display-Bold.otf'),
  });

  // State theo dõi trạng thái khởi tạo
  const [permissionsGranted, setPermissionsGranted] = useState(false); // Trạng thái quyền truy cập ảnh đã được cấp
  const [notificationSetup, setNotificationSetup] = useState(false); // Trạng thái thiết lập thông báo hoàn tất
  const [initializationTimeout, setInitializationTimeout] = useState(false); // Trạng thái timeout khởi tạo (10s)

  /**
   * Yêu cầu quyền truy cập thư viện ảnh
   */
  const requestPhotoPermission = useCallback(async () => {
    try {
      if (Platform.OS !== "web") {
        // Yêu cầu quyền truy cập media library từ hệ thống
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          // Hiển thị thông báo nếu người dùng từ chối quyền
          Alert.alert(
            "Quyền truy cập bị từ chối",
            "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn ảnh hồ sơ. Vui lòng cấp quyền trong cài đặt thiết bị.",
            [{ text: "OK" }]
          );
        }
        // QUAN TRỌNG: Luôn trả về true để app không bị treo, dù có quyền hay không
        return true;
      }
      return true; // Web không cần quyền truy cập ảnh
    } catch (error) {
      console.warn("Lỗi khi yêu cầu quyền ảnh:", error);
      Alert.alert(
        "Lỗi",
        "Không thể yêu cầu quyền truy cập ảnh. Vui lòng thử lại."
      );
      // QUAN TRỌNG: Vẫn trả về true để app không bị treo ngay cả khi có lỗi
      return true;
    }
  }, []);

  /**
   * Thiết lập hệ thống push notifications
   */
  const setupNotifications = useCallback(async () => {
    try {
      // Thiết lập các listener để nhận thông báo push
      const unsubscribe =
        notificationServiceWrapper.setupNotificationListeners();

      // Yêu cầu quyền thông báo từ hệ thống (không bắt buộc cho app hoạt động)
      await notificationServiceWrapper.requestPermissions();

      // Đánh dấu thiết lập thông báo hoàn tất
      setNotificationSetup(true);

      // Trả về hàm cleanup để hủy listener khi cần
      return unsubscribe;
    } catch (error) {
      console.warn("Lỗi khi thiết lập thông báo:", error);
      // QUAN TRỌNG: Không chặn app khởi tạo nếu setup thông báo thất bại
      setNotificationSetup(true);
      return () => {}; // Trả về hàm rỗng nếu có lỗi
    }
  }, []);

  /**
   * Xử lý khi layout root view sẵn sàng
   */
  const onLayoutRootView = useCallback(async () => {
    // Điều kiện ẩn splash screen:
    // 1. Fonts đã tải xong VÀ
    // 2. (Quyền ảnh đã được cấp HOẶC đã timeout) VÀ
    // 3. (Thiết lập thông báo hoàn tất HOẶC đã timeout)
    if (
      fontsLoaded &&
      (permissionsGranted || initializationTimeout) &&
      (notificationSetup || initializationTimeout)
    ) {
      await SplashScreen.hideAsync(); // Ẩn màn hình splash
    }
  }, [
    fontsLoaded,
    permissionsGranted,
    notificationSetup,
    initializationTimeout,
  ]);
  // Khởi tạo app khi component mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Bước 1: Khởi tạo quyền truy cập ảnh
        const photoGranted = await requestPhotoPermission();
        setPermissionsGranted(photoGranted);

        // Bước 2: Khởi tạo hệ thống thông báo
        const notificationCleanup = await setupNotifications();

        // Bước 3: Lưu hàm cleanup để dùng sau (nếu cần)
        if (notificationCleanup && typeof notificationCleanup === "function") {
          // Có thể lưu hàm cleanup này nếu cần
          // Hiện tại để component lifecycle xử lý
        }
      } catch (error) {
        console.warn("Lỗi khi khởi tạo app:", error);
        // QUAN TRỌNG: Đảm bảo app vẫn có thể khởi động ngay cả khi có lỗi
        setPermissionsGranted(true);
        setNotificationSetup(true);
      }
    };

    // Thiết lập timeout 10 giây để đảm bảo app không bị treo vô thời hạn
    const timeoutId = setTimeout(() => {
      console.warn("Timeout khởi tạo app, force start");
      setInitializationTimeout(true); // Đánh dấu đã timeout
      setPermissionsGranted(true); // Force set quyền ảnh = true
      setNotificationSetup(true); // Force set thông báo = true
    }, 10000); // 10 giây timeout

    initializeApp(); // Chạy hàm khởi tạo

    // Cleanup: Hủy timeout khi component unmount
    return () => clearTimeout(timeoutId);
  }, [requestPhotoPermission, setupNotifications]);

  // Ẩn splash screen khi mọi thứ sẵn sàng
  useEffect(() => {
    // Kiểm tra điều kiện để ẩn splash screen:
    // 1. Fonts đã tải xong VÀ
    // 2. (Quyền ảnh đã được cấp HOẶC đã timeout) VÀ
    // 3. (Thiết lập thông báo hoàn tất HOẶC đã timeout)
    if (
      fontsLoaded &&
      (permissionsGranted || initializationTimeout) &&
      (notificationSetup || initializationTimeout)
    ) {
      onLayoutRootView(); // Gọi hàm ẩn splash screen
    }
  }, [
    fontsLoaded,
    permissionsGranted,
    notificationSetup,
    initializationTimeout,
    onLayoutRootView,
  ]);

  // Hiển thị loading nếu chưa sẵn sàng
  // Điều kiện hiển thị loading (return null):
  // 1. Fonts chưa tải xong HOẶC
  // 2. (Quyền ảnh chưa được cấp VÀ chưa timeout) HOẶC
  // 3. (Thiết lập thông báo chưa hoàn tất VÀ chưa timeout)
  if (
    !fontsLoaded ||
    (!permissionsGranted && !initializationTimeout) ||
    (!notificationSetup && !initializationTimeout)
  ) {
    return null; // Hiển thị màn hình trống (loading)
  }

  console.log("fontsLoaded:", fontsLoaded);
  

  // Hiển thị app chính khi tất cả điều kiện đã thỏa mãn
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AuthProvider>
          <BottomSheetModalProvider>
            <AppNavigator />
          </BottomSheetModalProvider>
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
