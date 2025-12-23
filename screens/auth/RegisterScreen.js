import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  Platform,
  Alert,
  Keyboard,
  Animated,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { apiPost } from "../../services/api";

const { height: screenHeight } = Dimensions.get("window");

export default function RegisterScreen() {
  const navigation = useNavigation();

  // Form state
  const [formData, setFormData] = useState({
    account: "",
    email: "",
    phone: "",
    password: "",
    name: "",
    cccd: "",
    facebook: "",
    zalo: "",
    address: "",
  });

  // UI state
  const [securePassword, setSecurePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Refs for input focus
  const accountInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const cccdInputRef = useRef(null);
  const facebookInputRef = useRef(null);
  const zaloInputRef = useRef(null);
  const addressInputRef = useRef(null);

  // Update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.account.trim()) {
      newErrors.account = "Tài khoản không được để trống";
    } else if (formData.account.length < 3) {
      newErrors.account = "Tài khoản phải có ít nhất 3 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Phone validation - now optional
    if (formData.phone.trim() && !/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Họ và tên không được để trống";
    }

    // CCCD validation - now optional
    if (formData.cccd.trim() && !/^[0-9]{12}$/.test(formData.cccd)) {
      newErrors.cccd = "CCCD phải có 12 số";
    }

    // Facebook link validation (optional but if provided, must be valid)
    if (
      formData.facebook.trim() &&
      !formData.facebook.includes("facebook.com")
    ) {
      newErrors.facebook = "Link Facebook không hợp lệ";
    }

    // Zalo phone validation (optional but if provided, must be valid)
    if (formData.zalo.trim() && !/^[0-9]{10,11}$/.test(formData.zalo)) {
      newErrors.zalo = "Số điện thoại Zalo không hợp lệ";
    }

    // Address validation (optional)
    if (formData.address.trim() && formData.address.trim().length < 10) {
      newErrors.address = "Địa chỉ phải có ít nhất 10 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiPost("/register", {
        account: formData.account.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        name: formData.name.trim(),
        cccd: formData.cccd.trim(),
        facebook: formData.facebook.trim() || null,
        zalo: formData.zalo.trim() || null,
        address: formData.address.trim() || null,
      });

      if (response.data) {
        Alert.alert(
          "Đăng ký thành công",
          "Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập để tiếp tục.",
          [
            {
              text: "Đăng nhập ngay",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ]
        );
      }
    } catch (error) {
      console.log("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.";

      Alert.alert("Lỗi đăng ký", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return <View></View>;
}
