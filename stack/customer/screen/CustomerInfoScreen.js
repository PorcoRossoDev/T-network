import { useNavigation } from "@react-navigation/native";
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, useWindowDimensions, FlatList, TextInput } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import BottomSheetLearnMore from '../../../components/auth/BottomSheetLearnMore'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { HeavyFakeBlurText } from "../../../components/common/HeavyFakeBlurText";

import {
  Dimensions,
  NativeModules,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";

// Header Bar
const HeaderBar = () => {
  const navigation = useNavigation();
  return (
      <View className="px-4 py-2 h-16 flex flex-row justify-center items-center rounded-b-3xl relative z-50 bg-white">
        <View className="absolute left-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="relative w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
            <FontAwesome name="angle-left" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View className="relative">
          <TouchableOpacity>
            <Text className="font-sgbold text-f19 text-center">Thông tin tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const CustomerInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-5 relative">
      <HeaderBar />
      <View className="relative z-50 mt-3 bg-white py-4 rounded-t-3xl flex-1 justify-between">
        <View className="px-4 mt-3">
          <View className="flex-row justify-between border-b border-gray-200 items-center pb-3 mb-5">
            <Text className="font-sgmedium text-f16">Xác thực bằng</Text>
            <View className="bg-green-200 px-4 py-2 rounded-2xl">
              <Text className="font-sgmedium text-f16 text-green-600">Gmail</Text>
            </View>
          </View>
          <View className="flex-row justify-between border-b border-gray-200 items-center pb-5 mb-5">
            <Text className="font-sgmedium text-f16">InterLink ID</Text>
            <View className="flex-row items-center">
              <Text className="font-sgmedium text-f16 text-gray-400">@9845758478</Text>
              <TouchableOpacity className="pl-2">
                <Ionicons name="copy-outline" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-between border-b border-gray-200 items-center pb-5">
            <Text className="font-sgmedium text-f16">Email</Text>
            <View className="">
              <Text className="font-sgmedium text-f16 text-gray-400">binh1938**tb@gmail.com</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CustomerInfoScreen;
