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
      <View className="px-4 py-2 flex flex-row justify-between items-center rounded-b-3xl relative z-50 bg-white">
        <View className="w-[20%]">
          <TouchableOpacity onPress={() => navigation.goBack()} className="relative w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
            <FontAwesome name="angle-left" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View className="relative w-[60%]">
          <TouchableOpacity>
            <Text className="font-sgbold text-f19 text-center">Giới thiệu</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-end">
          <TouchableOpacity onPress={() => navigation.navigate('Customer')} className="relative px-3 flex-row py-2 justify-center items-center bg-gray-100 rounded-full">
            <MaterialCommunityIcons name="history" size={24} color="black" />
            <Text className="ml-1 font-sgregular">Lịch sử</Text>
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
    <View className="mt-2 px-4">
      <Text className="font-sgmedium text-f18">Mời bạn bè và tăng sức mạnh Human Hash của bạn</Text>
      <Image source={banner} className="w-full h-44 rounded-xl mt-4" resizeMode="cover" />
      <Text className="text-center mt-5 text-gray-600 font-sgregular text-f15">Cách giới thiệu và nhận phần thưởng?</Text>
    
      <View className="flex-row mt-2">
        {steps.map((item, index) => {
          return (
            <View key={index} className="w-1/3">
              <View key={item.id} className="justify-center items-center mt-4">
                <View className="w-10 h-10 bg-gray-200 justify-center items-center rounded-full">
                  <Ionicons name={item.icon} size={20} color="#6864f0" />
                </View>
                <View className="w-2/3 mt-4 relative justify-center items-center">
                  <Text className="text-f14 text-center w-[80%] font-sgregular">{item.title}</Text>
                  {
                    index < steps.length - 1 && (
                      <View className="absolute top-0 -right-8 w-8 h-[1] bg-gray-300" />
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
            <Text className="text-left text-gray-700 font-sgmedium flex-1">Mã giới thiệu</Text>
            <View className="relative w-[60%]">
              <View className="relative items-end">
                <HeavyFakeBlurText>
                  ITLG123456
                </HeavyFakeBlurText>
              </View>
            </View>
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
                <HeavyFakeBlurText>
                  ITLG123456
                </HeavyFakeBlurText>
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
const HumanHash = ({bottomSheetRef, openSheet}) => {
  const tabs = ['Giới thiệu trực tiếp', 'Giới thiệu gián tiếp']
  const [active, setActive] = useState(0)
  return (
    <View className="px-4">
      <View className="flex-row justify-between mt-2 items-center">
        
        <View className="flex-row items-center">
          <Text className="text-f16 font-sgregular">
            Human Has của bạn
          </Text>

          <View className="ml-1 translate-y-[1px]">
            <MaterialCommunityIcons
              name="information-variant-circle-outline"
              size={17}
              color="black"
            />
          </View>
        </View>

        <TouchableOpacity onPress={openSheet}>
          <Text className="font-sgbold text-f15 text-primary">Tìm hiểu thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Xác minh */}
      <View className="flex-row mt-5 bg-orange-100 p-4 border border-orange-300 rounded-lg">
        <View className="w-6 h-6 bg-yellow-400 justify-center items-center rounded-full">
          <Fontisto name="locked" size={15} color="white" />
        </View>
        <View className="w-[65%] px-3">
          <Text className="font-sgbold text-f16">Bạn chưa xác minh</Text>
          <Text className="text-gray-500 mt-1 font-sgregular leading-4">Xác minh ngay để nhận Sức Mạnh Human Hash</Text>
        </View>
        <View className="w-[30%]">
          <TouchableOpacity className="bg-black rounded-md">
            <Text className="text-white text-center py-2 font-sgbold">Xác minh ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*  */}
      <View className="mt-5">
        <LinearGradient
          colors={['#EAF6FF', '#F1EEFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 16,
          }}
        >
          <View className="p-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-f16 font-sgbold">Tổng Sức Mạnh Human Hash (HHP)</Text>
              <Text className="text-f15 font-sgregular">1.0</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-f15 text-gray-500">HHP Hoạt động</Text>
              <Text className="text-f15 text-gray-500 font-sgregular">1.0</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-f15 text-gray-500">Husman Has cơ bản</Text>
              <Text className="text-f15 text-gray-500 font-sgregular">1.0</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-f15 text-gray-500">Giới thiệu trực tiếp</Text>
              <Text className="text-f15 text-gray-500 font-sgregular">+1.0</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-f15 text-gray-500">Giới thiệu gián tiêp</Text>
              <Text className="text-f15 text-gray-500 font-sgregular">+1.0</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Gửi mã */}
      <View className="mt-5">
        <Text className="text-f15 font-sgmedium">Gửi Mã giới thiệu</Text>
        <View className="mt-3 bg-[#f0db99] rounded-xl p-4">
          <View className="bg-white rounded-3xl relative flex-row py-3">
            <View className="absolute left-2 top-1/2 translate-y-[-50%]">
              <MaterialCommunityIcons name="link-variant" size={20} color="#6b7280" />  
            </View>
            <TextInput
              className="px-8 font-sgregular h-6"
              placeholder="Nhập mã giới thiệu"
              />
            <View className="absolute right-3 h-12 justify-center items-center top-0"
            
            >
              <Text className="text-f12 font-sgregular">+0.5HHP</Text>
            </View>
          </View>
          <Text className="mt-2 text-gray-500 font-sgregular">Nhập mã giới thiệu để nhận 0.5 thêm mã Husman Hash</Text>
        </View>
      </View>

      {/* Lịch sử */}
      <View className="mt-5">
        <Text className="text-f15 font-sgmedium">Lịch sử</Text>
        <View className="mt-3 bg-gray-100 rounded-xl p-3">
          <View className="flex-row bg-gray-200 p-1 rounded-lg">
            {tabs.map((item, index) => {
              const isActive = active === index
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setActive(index)}
                  className={`flex-1 py-3 rounded-lg ${
                    isActive ? 'bg-white shadow' : ''
                  }`}
                >
                  <Text
                    className={`text-center font-sgmedium ${
                      isActive ? 'text-black' : 'text-gray-700'
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <View>
            {active === 0 ? <HisToryTabDirect /> : <HisToryTabInDirect />}
          </View>
        </View>
      </View>
    </View>
  )
}

// Tab trực tiếp
const HisToryTabDirect = () => {
  return (
    <View className="p-2 justify-center items-center h-[100px]">
      <View className="">
        <View className="justify-center items-center">
          <MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="#9ca3af" />
        </View>
        <Text className="mt-2 text-gray-400 font-sgregular">Không có dữ liệu</Text>
      </View>
    </View>
  )
}

// Tab gián tiếp
const HisToryTabInDirect = () => {
  return (
    <View className="p-2 justify-center items-center h-[100px]">
      <View className="">
        <View className="justify-center items-center">
          <MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="#9ca3af" />
        </View>
        <Text className="mt-2 text-gray-400">Không có dữ liệu</Text>
      </View>
    </View>
  )
}

const HistoryScreen = () => {
  const navigation = useNavigation();
  const tabs = ['Giới thiệu', 'Human Hash']
  const [active, setActive] = useState(0)

  /*=== START: Modal - Lấy mã pin ===*/
  const bottomSheetRef = useRef(null);
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <View className="flex-1 bg-gray-5 relative">
      <HeaderBar />
      <View className="relative z-50 mt-3 bg-white py-4 rounded-t-3xl flex-1">
        <View className="px-4">
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
                    className={`text-center font-sgmedium ${
                      isActive ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        <ScrollView className="flex-1">
          {active === 0 ? <Introduce /> : <HumanHash bottomSheetRef={bottomSheetRef} openSheet={openSheet} />}
        </ScrollView>
        <View className="px-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mt-5 bg-primary h-14 items-center justify-center rounded-3xl">
            <Text className="text-center text-white font-sgbold text-f16">Khai tác $ITLG của bạn</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetLearnMore
        ref={bottomSheetRef}
        onClose={closeSheet}
      />
    </View>
  );
};
export default HistoryScreen;
