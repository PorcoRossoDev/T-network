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

const ForgotScreen = () => {
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
        <Text className="font-sgregular text-f17 mt-3">Nhập Email của bạn để lấy lại mật khẩu</Text>
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

        <View className="mt-6 justify-end items-end">
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="text-orange-600 font-sgmedium text-f15">Đăng nhập</Text>
          </Pressable>
        </View>
        
        <View className="mt-6 justify-center items-center">
          <Pressable onPress={() => navigation.navigate('Home')} className="px-5 h-14 justify-center items-center bg-blue-600 w-full rounded-3xl">
            <Text className="text-white font-sgbold text-f18 text-center">Lấy lại mật khẩu</Text>
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

export default ForgotScreen;