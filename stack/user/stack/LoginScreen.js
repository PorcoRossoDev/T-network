import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Pressable,
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
import BottomSheetForgotID from "../../../components/auth/BottomSheetForgotID";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "../../../context/AuthContext";
import { enableFaceId, disableFaceId } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  // Focus states
  const [focus, setFocus] = useState({});
  const handleFocus = (name) => setFocus((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocus((prev) => ({ ...prev, [name]: false }));

  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const Header = () => {
    const logo = require("../../../assets/images/logo.webp");
    return (
      <View className="">
        <Pressable className="flex-row items-center">
          <Image
          className="h-14"
          style={{ width: undefined, aspectRatio: 1 }} // aspectRatio = width / height
          resizeMode="contain"
          source={logo}
          />
        </Pressable>
        <Text className="font-sgbold text-f25 mt-5">Chào mừng đến với TNetwork</Text>
        <Text className="font-sgregular text-f17 mt-3">Đăng nhập vào tài khoản của bạn</Text>
      </View>
    )
  }

  const Form = () => {
    const navigation = useNavigation();
    return (
      <View className="mt-16">
        <View>
          <Text className="font-sgregular text-f16 mb-3">Email</Text>
          <TextInput
            placeholder="Nhập tài khoản"
            placeholderTextColor="#999"
            className={`h-[60px] px-5 rounded-3xl font-sgregular text-f15 border border-gray-200`}
            value={username}
            onChangeText={setUsername}
            onFocus={() => handleFocus("username")}
            onBlur={() => handleBlur("username")}
          />
        </View>
        <View className="mt-6">
          <Text className="font-sgregular text-f16 mb-3">Mật khẩu</Text>
          <View className="relative">
            <TextInput
              placeholder="Nhập mật khẩu"
              className={`h-[60px] pl-5 rounded-3xl font-sgregular text-f15 border border-gray-200`}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}logins
              onChangeText={setPassword}
            />
            <TouchableOpacity
              className="absolute right-5"
              style={{
                top: '50%',
                transform: [{ translateY: '-50%' }],
              }}
              onPress={() => setShowPassword(!showPassword)}
              login
            >
              <View className="justify-center items-center z-50">
                {showPassword ? (
                  <EyeSlashIcon size={18} color="#555" />
                ) : (
                  <EyeIcon
                    size={18}
                    color={focus.password ? "#555" : "#555"}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6 justify-end items-end">
          <Pressable onPress={() => navigation.navigate('Forgot')}>
            <Text className="text-orange-600 font-sgmedium text-f15">Quên mật khẩu?</Text>
          </Pressable>
        </View>
        
        <View className="mt-6 justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Home')} className="px-5 h-14 justify-center items-center bg-blue-600 w-full rounded-3xl">
            <Text className="text-white font-sgbold text-f18 text-center">Đăng nhập</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View>
        <Header />
        <Form />
      </View>
    </View>
  );
}

export default LoginScreen