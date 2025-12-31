import { useNavigation } from "@react-navigation/native";
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, useWindowDimensions, FlatList } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomNavigation from "../../components/common/BottomNavigation";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import {
  Dimensions,
  NativeModules,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";

const HeaderBar = () => {
  const navigation = useNavigation();
  const logo = require("../../assets/images/logo.webp");
  return (
      <View className="px-4 py-2 flex flex-row justify-between rounded-b-3xl relative z-50 bg-white">
        <TouchableOpacity className="relative">
          <Image source={logo} className="w-9 h-9" resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Customer')} className="relative w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
          <FontAwesome name="user" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>
  )
}

// Khai thác
const Exploit = () => {
  const BannerConnect = require("../../assets/image-app/nexkG-white.png");
  const { width } = Dimensions.get("window");
  const newWidth = width * 0.7;

  return (
    <View className="px-4 flex-row justify-center mt-3 relative">
      <View
        style={{
          width: newWidth,
          height: newWidth,
          borderWidth: 6,
          borderColor: '#5296DD',
          borderRadius: newWidth / 2,
        }}
        className="justify-center items-center relative right-5"
      >
        <Image
          source={BannerConnect}
          style={{
            width: newWidth,
            height: newWidth,
          }}
          className="relative bottom-5"
          resizeMode="contain"
        />

        <View className="mt-2 absolute bottom-7">
          <Text className="font-bold text-f19 text-center">
            55M+ Engaged
          </Text>
          <Text className="font-bold text-f19 text-center text-orange-400">
            Pioneers
          </Text>
        </View>
      </View>
      <Aside />
    </View>
  )
}

const News = () => {
  const posts = [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/400/300?random=1',
      title: 'Khai thác Pi Network hiệu quả',
      excerpt: 'Hướng dẫn cách tối ưu tốc độ khai thác và duy trì phiên đào Pi mỗi ngày.',
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/400/300?random=2',
      title: 'Blockchain là gì?',
      excerpt: 'Tìm hiểu công nghệ blockchain và ứng dụng thực tế trong tiền điện tử.',
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/400/300?random=3',
      title: 'Bảo mật ví tiền điện tử',
      excerpt: 'Những lưu ý quan trọng để bảo vệ tài sản số của bạn khỏi rủi ro.',
    },
    {
      id: 4,
      thumbnail: 'https://picsum.photos/400/300?random=4',
      title: 'Web3 và tương lai Internet',
      excerpt: 'Web3 đang thay đổi cách chúng ta tương tác và sở hữu dữ liệu.',
    },
    {
      id: 5,
      thumbnail: 'https://picsum.photos/400/300?random=5',
      title: 'Ứng dụng DeFi phổ biến',
      excerpt: 'Danh sách các nền tảng DeFi được cộng đồng tin dùng hiện nay.',
    },
  ];

  return (
    <View className="mt-6">
      <View className="px-4">
        <Text className="font-bold text-f17">@Picore Team</Text>
        <Text className="mt-1">
          Follow our oficial media channels to keep up with the Lastest Pi Network updates
          and content! Beware of impersonators. We've liked Twitter and Telegram above
        </Text>
      </View>
      <View className="mt-6 px-4">
        <FlatList
          data={posts}
          nestedScrollEnabled
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row">
                  <EvilIcons name="user" size={21} color="black" />
                  <Text className="text-f13">
                    Admin
                  </Text>
                </View>
                <View className="flex-row">
                  <Ionicons name="calendar-clear-outline" size={14} className="" color="black" />
                  <Text className="text-f13 ml-1">
                    12 tháng 8, 2025
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  source={{ uri: item.thumbnail }}
                  className="w-full h-60 rounded-xl"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="mt-2 font-semibold text-f16">
                  {item.title}
                </Text>
              </TouchableOpacity>
              <Text className="text-gray-500 mt-0.5">
                {item.excerpt}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const Aside = () => {
  return (
    <View className="absolute right-4 w-[15%] flex-col space-y-7 h-full justify-center">
      <TouchableOpacity className="justify-center items-center">
        <FontAwesome5 name="user-friends" size={26} color="#6b7280" />
        <Text className="font-bold mt-1">0/0</Text>
      </TouchableOpacity>
      <TouchableOpacity className="justify-center items-center">
        <MaterialCommunityIcons name="flash" size={26} color="#6b7280" />
        <Text className="font-bold mt-1">0,0 m/H</Text>
      </TouchableOpacity>
      <TouchableOpacity className="justify-center items-center">
        <FontAwesome5 name="share" size={26} color="#6b7280" />
        <Text className="font-bold mt-1">Invite</Text>
      </TouchableOpacity>
      <TouchableOpacity className="justify-center items-center">
        <MaterialCommunityIcons name="alert-decagram" size={26} color="#6b7280" />
        <Text className="font-bold mt-1">Review</Text>
      </TouchableOpacity>
    </View>
  )
}

const HomeScreen = () => {
  const { width } = Dimensions.get("window");
  const sideSpacing = 16;
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-10 relative">
      <HeaderBar />
      <ScrollView className="relative z-50 mt-3 bg-white pt-4 rounded-t-3xl">
        <View className="pb-10">
          <Exploit />
          <News />
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default HomeScreen;
