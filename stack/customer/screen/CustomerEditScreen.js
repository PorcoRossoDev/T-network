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
            <Text className="font-sgbold text-f19 text-center">Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const CustomerEditScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-5 relative">
      <HeaderBar />
      <View className="relative z-50 mt-3 bg-white py-4 rounded-t-3xl flex-1 justify-between">
        <View>
          <View className="px-4">
            <Text className="text-center text-2xl font-sgbold mt-8">Chọn tên người dùng của bạn</Text>
            <Text className="text-center text-gray-500 mt-3 text-f15 font-sgregular leading-5">
              Tên người dùng của bạn có thể được thay đổi,
              nhưng ID của bạn là duy nhất và không thể chỉnh sửa
            </Text>
          </View>

          <View className="px-4 mt-8 relative">
            <View className="border border-primary rounded-2xl h-[70px] px-3 flex-row items-center">
              <View className="">
                <MaterialIcons name="perm-contact-cal" size={24} color="#9ca3af" />
              </View>
              <View className="w-[1px] h-[55%] bg-gray-300 mx-2"></View>
              <View className="">
                <Text className="text-gray-400 font-sgregular mb-1">Nhập tên người dùng</Text>
                <TextInput
                  value={'binh@'}
                  onChangeText={''}
                  onFocus={() => handleFocus("username")}
                  onBlur={() => handleBlur("username")}
                  className="font-sgregular"
                  placeholder=""
                  placeholderTextColor="#9ca3af"
                    />
              </View>
              <TouchableOpacity onPress={''} className="w-5 h-5 justify-center items-center bg-gray-300 rounded-full absolute right-3">
                  <MaterialIcons name="clear" size={15} color="#9ca3af" />
                </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="px-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mt-5 bg-primary h-14 items-center justify-center rounded-3xl">
            <Text className="text-center text-white font-sgbold text-f16">Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default CustomerEditScreen;
