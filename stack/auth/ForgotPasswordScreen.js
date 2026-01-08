import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { apiPost } from "../../services/api";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Email không được để trống");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Email không hợp lệ");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await apiPost("/auth/forgot-password", {
        email: email.trim(),
      });

      if (response.data) {
        Alert.alert(
          "Gửi yêu cầu thành công",
          "Chúng tôi đã gửi liên kết đặt lại mật khẩu vào email của bạn. Vui lòng kiểm tra hộp thư và spam.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ]
        );
      }
    } catch (error) {
      console.log("Forgot password error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmail = (value) => {
    setEmail(value);
    if (error) {
      setError("");
    }
  };

  return <View></View>;
}
