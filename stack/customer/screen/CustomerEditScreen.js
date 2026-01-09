import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, useWindowDimensions, FlatList, TextInput } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
            <View className="border border-primary rounded-2xl h-[70px] overflow-hidden flex-row items-center">
              <View className="w-7 ml-3">
                <MaterialIcons name="perm-contact-cal" size={24} color="#9ca3af" />
              </View>
              <View className="flex-row relative w-[60%]">
                <View className="w-[1px] bg-gray-300 mx-2 absolute h-[55%] top-1/2 -translate-y-5"></View>
                <View className="flex-1 pl-5">
                  <Text className={`text-gray-400 font-sgregular ${Platform.OS=='ios'?'mb-1.5':'relative top-1.5'}`}>Nhập tên người dùng</Text>
                  <TextInput
                    value={'binh@'}
                    onChangeText={''}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    className="font-sgregular text-f16"
                    placeholder=""
                    placeholderTextColor="#9ca3af"
                      />
                </View>
              </View>
              <View className="bg-gray-100 h-full flex-1 justify-center items-center">
                <Text className="font-sgregular borer-l border-gray-300">@9847627830</Text>
              </View>
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
