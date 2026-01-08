import { useNavigation } from "@react-navigation/native";
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, useWindowDimensions, FlatList } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import {
  Dimensions,
  NativeModules,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Chào buổi sáng!";
  } else if (currentHour < 18) {
    return "Chào buổi chiều!";
  } else {
    return "Chào buổi tối!";
  }
}

const HeaderBar = () => {
  const navigation = useNavigation();
  return (
      <View className="px-4 py-2 flex flex-row justify-between items-center rounded-b-3xl relative z-50 bg-white">
        <View className="w-[20%]">
          <TouchableOpacity onPress={() => navigation.goBack()} className="relative w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
            <FontAwesome name="angle-left" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View className="relative w-[60%]">
          <TouchableOpacity>
            <Text className="font-sgbold text-f19 text-center">Hồ sơ cá nhân</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-end">
          <TouchableOpacity onPress={() => navigation.navigate('Customer')} className="relative w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
            <FontAwesome name="user" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>
  )
}

const Avatar = () => {
  const navigation = useNavigation();
  const ImageFaceID = require("../../../assets/image-app/image-faceid.png");
  return (
    <View>
      <View className="justify-center items-center mt-4">
        <TouchableOpacity className="relative w-32 h-32 justify-center items-center rounded-full bg-gray-200 p-4 border border-gray-300">
          <FontAwesome name="user-o" size={60} color="#6b7280" />
          <View className="absolute top-2 -right-3 bg-gray-200 w-8 h-8 rounded-full justify-center items-center border-[3px] border-white">
            <MaterialCommunityIcons name="file-image-plus-outline" size={18} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="justify-center items-center mt-4">
        <Text className="font-sgmedium text-f20">
          Dev@20251001 
          <TouchableOpacity onPress={() => navigation.navigate('CustomerEdit')} className="w-6 h-6 justify-center items-center bg-gray-200 rounded-full ml-2 translate-x-2 translate-y-[5px]">
            <EvilIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </Text>
      </View>

      <View className="px-4 flex-row flex-wrap -mx-2 mt-6">
        <View className="w-1/2 px-2">
          <TouchableOpacity className="bg-gray-100 rounded-xl p-4 min-h-[140px] justify-end">
            <View className="justify-center items-center w-24 h-24 bg-white rounded-full absolute -top-4 -right-4">
              <Image source={ImageFaceID} className="w-8 h-8 mb-2 relative top-2 right-1" resizeMode="contain" />
            </View>
            <View>
              <Text className="font-sgmedium text-f15">Chưa xác minh</Text>
              <Text className="text-gray-500 mt-1 font-sgregular">Nhấn để xác minh</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 px-2">
          <TouchableOpacity onPress={() => navigation.navigate('CustomerIntroduce')} className="bg-gray-100 rounded-xl p-4 min-h-[140px] justify-end">
            <View className="justify-center items-center w-24 h-24 bg-white rounded-full absolute -top-4 -right-4">
              <Ionicons name="gift-outline" size={30} color="black" className="w-8 h-8 mb-2 relative top-2 right-1" />
            </View>
            <View>
              <Text className="font-sgmedium text-f15">Giới thiệu</Text>
              <Text className="text-gray-500 mt-1 font-sgregular">Mời bạn bè để nhận phần thưởng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const CustomerInfor = ({ customerNavigation }) => {
  const navigation = useNavigation();
  return (
    <View className="px-4 mt-9">
      <View>
        <Text className="text-f16 font-sgbold">Tiện ích mở rộng</Text>
        <TouchableOpacity className="mt-5 flex-row justify-between items-center">
          <View className="w-12 h-12 bg-black justify-center items-center rounded-xl">
            <MaterialCommunityIcons name="hand-coin" size={24} color="white" />
          </View>
          <View className="w-[70%] pl-3">
            <Text className="text-left font-sgmedium text-f16">Thanh toán QR</Text>
            <Text className="text-f14 text-gray-500 mt-1.5 font-sgregular">Chạm để thanh toán</Text>
          </View>
          <View className="flex-1">
            <View className="items-end">
              <Text className="bg-gray-200 px-3 py-2 text-center align-baseline rounded-xl font-sgregular">Mở</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text className="text-f16 font-sgbold">Hồ sơ cá nhân</Text>
        <View className="mt-5">
          {customerNavigation.map((item) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.name, {screen: item.screen})}  key={item.id} className="mb-2 flex-row justify-between items-center bg-gray-100 rounded-xl py-4 px-3">
              <View className="w-9 h-9 bg-black justify-center items-center rounded-full">
                <MaterialCommunityIcons name={item.icon} size={20} color="white" />
              </View>
              <View className="w-[70%] pl-3">
                <Text className="text-left text-f16 font-sgregular">{item.title}</Text>
              </View>
              <View className="flex-1">
                <View className="items-end">
                  <MaterialCommunityIcons name="chevron-right" size={26} color="#9ca3af" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity className="mb-2 flex-row justify-between items-center bg-red-100 rounded-xl py-3.5 px-3">
              <View className="w-9 h-9 justify-center items-center rounded-full">
                <AntDesign name="logout" size={24} color="#dc2626" />
              </View>
              <View className="w-[70%] pl-3">
                <Text className="text-left text-f16 text-red-600 font-sgregular">Đăng xuất</Text>
              </View>
              <View className="flex-1">
                <View className="items-end">
                  <MaterialCommunityIcons name="chevron-right" size={26} color="#9ca3af" />
                </View>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Socials = () => {
  return (
    <View className="px-4 py-4 flex-row justify-center items-center space-x-6">
      <TouchableOpacity>
        <AntDesign name="x" size={17} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="telegram-plane" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="web" size={20} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const CustomerOverviewScreen = () => {
  const { width } = Dimensions.get("window");
  const sideSpacing = 16;
  const navigation = useNavigation();
  const customerNavigation = [
    { id: '1', title: 'Hồ sơ cá nhân', icon: 'account-circle-outline', screen: 'CustomerProfile', name: 'Customer' },
    { id: '2', title: 'Cài đặt thông báo', icon: 'bell-outline', screen: 'CustomerNotifications', name: 'Customer' },
    { id: '3', title: 'Đăng nhập Admin', icon: 'account-circle-outline', screen: 'Login', name: 'User' },
  ]

  return (
    <View className="flex-1 bg-gray-5 relative">
      <HeaderBar />
      <ScrollView className="relative z-50 mt-3 bg-white py-4 rounded-t-3xl">
        <Avatar />
        <CustomerInfor customerNavigation={customerNavigation} />
        <Socials />
      </ScrollView>
    </View>
  );
};

export default CustomerOverviewScreen;
