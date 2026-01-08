import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Feather from "@expo/vector-icons/Feather";
import { apiPost } from "../../services/api";

const { height: screenHeight } = Dimensions.get("window");

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function ChangePasswordScreen() {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [secureCurrentPassword, setSecureCurrentPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const handleSave = async () => {
    // Client-side validation
    if (!currentPassword.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập mật khẩu hiện tại.");
      return;
    }
    if (!newPassword.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập mật khẩu mới.");
      return;
    }
    if (!confirmPassword.trim()) {
      Alert.alert("Thông báo", "Vui lòng xác nhận mật khẩu mới.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Thông báo", "Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Thông báo", "Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    setSaving(true);
    try {
      const response = await apiPost("auth/profile-change-password", {
        current_password: currentPassword,
        password: newPassword,
        confirm_password: confirmPassword,
      });

      Alert.alert(
        "Thành công",
        response.data.message || "Đã cập nhật mật khẩu thành công!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Thông báo", error.message);
    } finally {
      setSaving(false);
    }
  };

  const debouncedHandleSave = useCallback(debounce(handleSave, 500), [
    currentPassword,
    newPassword,
    confirmPassword,
  ]);

  return (
    <>
      <Header title="Đổi mật khẩu" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className="flex-1 bg-white rounded-t-3xl px-2 pt-6 -mt-7">
          {/* Header Section */}
          <View className="mb-6">
            <Text className="text-gray-600 text-base leading-6">
              Vui lòng nhập mật khẩu hiện tại và mật khẩu mới để cập nhật
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View className="space-y-1">
              {/* Mật khẩu hiện tại */}
              <View className="mb-5">
                <Text className="text-base font-medium text-gray-700 mb-2">
                  Mật khẩu hiện tại <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="Nhập mật khẩu hiện tại"
                  placeholderTextColor="#9CA3AF"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={secureCurrentPassword}
                  className="border-b border-gray-200 px-4 py-4 text-base text-gray-800"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    textAlignVertical: "center",
                    minHeight: 56,
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    setSecureCurrentPassword(!secureCurrentPassword)
                  }
                  className="absolute right-4 top-5 transform"
                  style={{ marginTop: 28 }}
                >
                  <Feather
                    name={secureCurrentPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              {/* Mật khẩu mới */}
              <View className="mb-5">
                <Text className="text-base font-medium text-gray-700 mb-2">
                  Mật khẩu mới <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  placeholderTextColor="#9CA3AF"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={secureNewPassword}
                  className="border-b border-gray-200 px-4 py-4 text-base text-gray-800"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    textAlignVertical: "center",
                    minHeight: 56,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setSecureNewPassword(!secureNewPassword)}
                  className="absolute right-4 top-5 transform"
                  style={{ marginTop: 28 }}
                >
                  <Feather
                    name={secureNewPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              {/* Xác nhận mật khẩu mới */}
              <View className="mb-5">
                <Text className="text-base font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu mới <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="Nhập lại mật khẩu mới"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={secureConfirmPassword}
                  className="border-b border-gray-200 px-4 py-4 text-base text-gray-800"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    textAlignVertical: "center",
                    minHeight: 56,
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    setSecureConfirmPassword(!secureConfirmPassword)
                  }
                  className="absolute right-4 top-5 transform"
                  style={{ marginTop: 28 }}
                >
                  <Feather
                    name={secureConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              {/* Security Tips */}
              <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <Text className="text-blue-800 font-medium mb-2">
                  Gợi ý bảo mật:
                </Text>
                <Text className="text-blue-700 text-sm leading-5">
                  • Sử dụng ít nhất 6 ký tự{"\n"}• Kết hợp chữ hoa, chữ thường
                  và số{"\n"}• Không sử dụng thông tin cá nhân dễ đoán
                </Text>
              </View>

              {/* Button */}
              <TouchableOpacity
                onPress={debouncedHandleSave}
                className="bg-red-500 rounded-xl shadow-md p-4 items-center mb-10"
                activeOpacity={0.8}
                disabled={saving}
                style={{
                  opacity: saving ? 0.7 : 1,
                }}
              >
                <View className="flex-row items-center">
                  {saving && (
                    <ActivityIndicator
                      size="small"
                      color="#fff"
                      className="mr-2"
                    />
                  )}
                  <Text className="text-white text-base font-semibold">
                    {saving ? "Đang cập nhật..." : "Đổi mật khẩu"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
