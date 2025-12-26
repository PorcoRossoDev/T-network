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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur' // or 'react-native-blur' for React Native projects

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
      <View className="px-4 py-2 flex flex-row justify-between items-center rounded-b-3xl relative z-50 bg-white">
        <View className="w-[20%]">
          <TouchableOpacity onPress={() => navigation.goBack()} className="relative w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
            <FontAwesome name="angle-left" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View className="relative w-[60%]">
          <TouchableOpacity>
            <Text className="font-bold text-f19 text-center">Giới thiệu</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-end">
          <TouchableOpacity onPress={() => navigation.navigate('Customer')} className="relative px-3 flex-row py-2 justify-center items-center bg-gray-100 rounded-full">
            <MaterialCommunityIcons name="history" size={24} color="black" />
            <Text className="ml-1">Lịch sử</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

// Tab 1: Introduce
const Introduce = () => {
  const banner = require("../../../assets/image-app/gioi-thieu.jpeg");
  const steps = [
    { id: '1', title: 'Chia sẻ mã giới thiệu/liên kết của bạn', icon: 'share-social' },
    { id: '2', title: 'Kết nối với bạn bè', icon: 'person-add' },
    { id: '3', title: 'Mở khoá thường Human Hush', icon: 'gift' },
  ]
  return (
    <View className="mt-2">
      <Text className="font-semibold text-f20">Mời bạn bè và tăng sức mạnh Human Hash của bạn</Text>
      <Image source={banner} className="w-full h-44 rounded-xl mt-4" resizeMode="cover" />
      <Text className="text-center mt-5 text-gray-600 font-medium">Cách giới thiệu và nhận phần thưởng?</Text>
    
      <View className="flex-row mt-2">
        {steps.map((item, index) => {
          return (
            <View key={index} className="w-1/3">
              <View key={item.id} className="justify-center items-center mt-4">
                <View className="w-10 h-10 bg-gray-200 justify-center items-center rounded-full">
                  <Ionicons name={item.icon} size={20} color="#6864f0" />
                </View>
                <View className="w-[70%] mt-4 relative justify-center items-center">
                  <Text className="text-f13 text-center w-[80%]">{item.title}</Text>
                  {
                    index < steps.length - 1 && (
                      <View className="w-[30%] h-[1px] bg-gray-300 absolute top-1 -right-[35%]" />
                    )
                  }
                </View>
              </View>
            </View>
          )
        })}
      </View>

      <View className="bg-gray-100 mt-8 rounded-xl px-3 py-3">
        <View className="flex-row justify-between items-center">
          <View className="flex-row justify-between items-center h-12 bg-white flex-1 rounded-lg py-3 px-3 border border-gray-200">
            <Text className="text-left text-gray-700 font-medium flex-1">Mã giới thiệu</Text>
            <Text className="text-right text-gray-700 font-medium w-[60%]">ITLG123456</Text>
          </View>
          <View className="justify-center items-center bg-white rounded-lg h-12 w-12 ml-2  border border-gray-200">
            <TouchableOpacity>
              <Ionicons name="copy-outline" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row justify-between items-center h-12 bg-white flex-1 rounded-lg py-3 px-3 border border-gray-200">
            <Text className="text-left text-gray-700 font-medium flex-1">Liên Kết giới thiệu</Text>
            <View className="relative w-[60%]">
              <View className="relative items-end">
                <BlurView
                  intensity={40}
                  tint="xlight"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                  }}/>
                <Text className="text-right text-gray-700 font-medium">ITLG123456</Text>
              </View>
            </View>
          </View>
          <View className="justify-center items-center bg-white rounded-lg h-12 w-12 ml-2  border border-gray-200">
            <TouchableOpacity>
              <Ionicons name="copy-outline" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-4 bg-blue-100 border border-blue-400 px-2 py-1 rounded-lg">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="information-variant-circle-outline" size={16} color="#6864f0" />
            <Text className="ml-1">Bạn cần nhập mã giới thiệu trước!</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-primary font-medium">Gửi ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// Tab 2: Human Hash
const HumanHash = () => {
  return (
    <View>
      <View className="flex-row justify-between mt-2">
        <Text>Introduce</Text>
        <TouchableOpacity>
          <Text className="font-semibold text-primary">Tìm hiểu thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CustomerIntroduceStack = () => {
  const navigation = useNavigation();
  const tabs = ['Giới thiệu', 'Human Hash']
  const [active, setActive] = useState(0)

  return (
    <View className="flex-1 bg-gray-5 relative">
      <HeaderBar />
      <View className="relative z-50 mt-3 bg-white py-4 rounded-t-3xl px-4 flex-1">
        <View className="flex-row bg-gray-200 rounded-3xl mb-4">
          {tabs.map((item, index) => {
            const isActive = active === index
            return (
              <TouchableOpacity
                key={item}
                onPress={() => setActive(index)}
                className={`flex-1 py-4 rounded-3xl ${
                  isActive ? 'bg-black shadow' : ''
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    isActive ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <ScrollView className="flex-1">
          {active === 0 ? <Introduce /> : <HumanHash />}
        </ScrollView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mt-5 bg-primary py-4 rounded-3xl">
            <Text className="text-center text-white font-bold text-f16">Khai tác $ITLG của bạn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomerIntroduceStack;
