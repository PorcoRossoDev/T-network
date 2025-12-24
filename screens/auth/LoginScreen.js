import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "../../context/AuthContext";
import { enableFaceId, disableFaceId } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const logo = require("../../assets/images/logo.webp");
  // Focus states
  const [focus, setFocus] = useState({});
  const handleFocus = (name) => setFocus((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocus((prev) => ({ ...prev, [name]: false }));

  // Form states
  const [username, setUsername] = useState("909898476");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  // Auth states
  const { loginUser, loginAsGuest } = useContext(AuthContext);
  const faceIdEnabled = useSelector((state) => state.user.faceIdEnabled);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [autoFaceIdTriggered, setAutoFaceIdTriggered] = useState(false);

  // Check biometric support (iOS only)
  useEffect(() => {
    const checkBiometricSupport = async () => {
      if (Platform.OS === "android") {
        setBiometricAvailable(false);
        return;
      }

      try {
        const [hasHardware, isEnrolled, supportedTypes] = await Promise.all([
          LocalAuthentication.hasHardwareAsync(),
          LocalAuthentication.isEnrolledAsync(),
          LocalAuthentication.supportedAuthenticationTypesAsync(),
        ]);

        const hasFaceID = supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        );

        if (hasHardware && isEnrolled && hasFaceID) {
          setBiometricAvailable(true);

          const [enabled, savedUsername, savedPassword] = await Promise.all([
            AsyncStorage.getItem("biometricEnabled"),
            AsyncStorage.getItem("username"),
            AsyncStorage.getItem("password"),
          ]);

          if (enabled === "true" && savedUsername && savedPassword) {
            dispatch(enableFaceId());
          } else {
            await AsyncStorage.setItem("biometricEnabled", "false");
            dispatch(disableFaceId());
          }
        } else {
          setBiometricAvailable(false);
          await AsyncStorage.setItem("biometricEnabled", "false");
          dispatch(disableFaceId());
        }
      } catch (error) {
        console.error("Error checking biometric support:", error);
        setBiometricAvailable(false);
        await AsyncStorage.setItem("biometricEnabled", "false");
        dispatch(disableFaceId());
      }
    };
    checkBiometricSupport();
  }, [dispatch]);

  // Auto-trigger Face ID login if enabled
  useEffect(() => {
    if (
      biometricAvailable &&
      faceIdEnabled &&
      Platform.OS === "ios" &&
      !autoFaceIdTriggered
    ) {
      setAutoFaceIdTriggered(true);
      const timer = setTimeout(() => {
        handleBiometricLogin(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [biometricAvailable, faceIdEnabled, autoFaceIdTriggered]);

  // Load saved credentials for biometric login (memoized)
  const loadCredentials = useCallback(async () => {
    try {
      const [savedUsername, savedPassword] = await Promise.all([
        AsyncStorage.getItem("username"),
        AsyncStorage.getItem("password"),
      ]);
      return { savedUsername, savedPassword };
    } catch (error) {
      console.log("Error loading credentials:", error);
      return { savedUsername: null, savedPassword: null };
    }
  }, []);

  // Handle biometric login (Face ID on iOS)
  const handleBiometricLogin = useCallback(
    async (isAutoTriggered = false) => {
      if (Platform.OS === "android" || !biometricAvailable || !faceIdEnabled) {
        if (!isAutoTriggered) {
          Alert.alert("Thông báo", "Face ID không khả dụng.");
        }
        return;
      }

      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Xác thực bằng Face ID",
          fallbackLabel: "Sử dụng mật khẩu",
          cancelLabel: "Hủy",
          disableDeviceFallback: false,
        });

        if (result.success) {
          const { savedUsername, savedPassword } = await loadCredentials();
          if (!savedUsername || !savedPassword) {
            Alert.alert(
              "Thông báo",
              "Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập thủ công trước."
            );
            return;
          }
          const loginResult = await loginUser(savedUsername, savedPassword);
          if (!loginResult.success) {
            Alert.alert("Thông báo", loginResult.error);
          }
        } else if (!isAutoTriggered) {
          Alert.alert(
            "Xác thực thất bại",
            "Xác thực Face ID không thành công. Vui lòng thử lại."
          );
        }
      } catch (error) {
        console.error("Face ID authentication error:", error);
        if (!isAutoTriggered) {
          Alert.alert("Thông báo", "Đã xảy ra lỗi khi xác thực bằng Face ID.");
        }
      }
    },
    [biometricAvailable, faceIdEnabled, loadCredentials, loginUser]
  );

  // Handle guest login
  const handleGuestLogin = async () => {
    try {
      const result = await loginAsGuest();
      if (!result.success) {
        Alert.alert(
          "Thông báo",
          result.error || "Không thể đăng nhập với tư cách khách."
        );
      }
    } catch (error) {
      console.error("Guest login error:", error);
      Alert.alert(
        "Thông báo",
        "Đã xảy ra lỗi khi đăng nhập với tư cách khách."
      );
    }
  };

  // Handle manual login
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập tài khoản và mật khẩu.");
      return;
    }

    try {
      const result = await loginUser(username, password);
      if (!result.success) {
        return;
      }

      // Clear form
      setUsername("");
      setPassword("");

      // Kiểm tra xem đã từng hỏi về Face ID setup chưa
      const hasAskedFaceIdSetup = await AsyncStorage.getItem(
        "hasAskedFaceIdSetup"
      );

      if (
        Platform.OS === "ios" &&
        biometricAvailable &&
        !faceIdEnabled &&
        hasAskedFaceIdSetup !== "true"
      ) {
        setTimeout(() => {
          Alert.alert(
            "Bật Face ID",
            "Bạn có muốn bật Face ID để đăng nhập nhanh hơn lần sau không?",
            [
              {
                text: "Không",
                style: "cancel",
                onPress: async () => {
                  await AsyncStorage.setItem("hasAskedFaceIdSetup", "true");
                },
              },
              {
                text: "Bật",
                onPress: async () => {
                  try {
                    const authResult =
                      await LocalAuthentication.authenticateAsync({
                        promptMessage: "Xác thực Face ID để bật đăng nhập",
                        fallbackLabel: "Sử dụng mật khẩu",
                        cancelLabel: "Hủy",
                        disableDeviceFallback: false,
                      });

                    if (authResult.success) {
                      await Promise.all([
                        AsyncStorage.setItem("biometricEnabled", "true"),
                        AsyncStorage.setItem("hasAskedFaceIdSetup", "true"),
                      ]);
                      dispatch(enableFaceId());
                    } else {
                      Alert.alert(
                        "Thông báo",
                        "Xác thực Face ID thất bại. Bạn có thể bật Face ID trong cài đặt ứng dụng."
                      );
                      await AsyncStorage.setItem("hasAskedFaceIdSetup", "true");
                    }
                  } catch (error) {
                    console.error("Error enabling Face ID:", error);
                    Alert.alert(
                      "Thông báo",
                      "Không thể bật Face ID. Bạn có thể thử lại trong cài đặt ứng dụng."
                    );
                    await AsyncStorage.setItem("hasAskedFaceIdSetup", "true");
                  }
                },
              },
            ]
          );
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Thông báo", "Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  const clearInputID = () => {
    setUsername("");
  }

  return (
    <SafeAreaView className="flex-1 justify-between bg-white">
      <View className="bg-white mt-10">
        <View className="px-4 flex-row justify-between items-center">
          <TouchableOpacity className="w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
              <Fontisto name="angle-left" size={18} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="">
            <Image source={logo} className="w-12 h-12" resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
            <MaterialIcons name="support-agent" size={35} color="black" />
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <Text className="text-center text-3xl font-medium mt-8">Đăng nhập</Text>
          <Text className="text-center text-gray-500 mt-3 text-f15">Đăng nhập bằng khuôn mặt của bạn - Chìa khoá chính là mật khẩu của bạn. CHỉ cần quét và bắt đầu.</Text>
        </View>

        <View className="px-4 mt-8 relative">
          <View className="border border-primary rounded-2xl h-[70px] px-3 flex-row items-center">
            <View className="">
              <MaterialIcons name="perm-contact-cal" size={24} color="#9ca3af" />
            </View>
            <View className="w-[1px] h-[55%] bg-gray-300 mx-2"></View>
            <View className="">
              <Text className="text-gray-400">Nhập ID của Bạn</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                onFocus={() => handleFocus("username")}
                onBlur={() => handleBlur("username")}
                className=""
                placeholder=""
                placeholderTextColor="#9ca3af"
                  />
            </View>
            {
              username.length > 0 && (
                <TouchableOpacity onPress={clearInputID} className="w-5 h-5 justify-center items-center bg-gray-300 rounded-full absolute right-3">
                  <MaterialIcons name="clear" size={15} color="#9ca3af" />
                </TouchableOpacity>
              )
            }
          </View>
          <TouchableOpacity className="mt-4">
              <Text className="text-center font-bold text-blue-600">Quên ID đăng nhập?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4">
        <TouchableOpacity onPress={() => navigation.navigate("Pin")} className="bg-primary rounded-[40px] h-16 justify-center items-center">
          <Text className="text-white text-center font-bold text-f17">Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
