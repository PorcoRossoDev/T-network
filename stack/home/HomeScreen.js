import { useNavigation } from "@react-navigation/native";
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, useWindowDimensions, FlatList, Pressable } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomNavigation from "../../components/common/BottomNavigation";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
    // <View className="px-4 flex-row justify-center mt-3 relative">
    //   <View
    //     style={{
    //       width: newWidth,
    //       height: newWidth,
    //       borderWidth: 6,
    //       borderColor: '#5296DD',
    //       borderRadius: newWidth / 2,
    //     }}
    //     className="justify-center items-center relative right-5"
    //   >
    //     <Image
    //       source={BannerConnect}
    //       style={{
    //         width: newWidth,
    //         height: newWidth,
    //       }}
    //       className="relative bottom-5"
    //       resizeMode="contain"
    //     />

    //     <View className="mt-2 absolute bottom-7">
    //       <Text className="font-bold text-f19 text-center">
    //         55M+ Engaged
    //       </Text>
    //       <Text className="font-bold text-f19 text-center text-orange-400">
    //         Pioneers
    //       </Text>
    //     </View>
    //   </View>
    //   <Aside />
    // </View>
    <View className="mx-4 mt-6 bg-white rounded-3xl p-6 flex-row  border border-gray-100" style={styles.itemShadow}>
      {/* Map */}
      <View className="flex-1 items-center">
        <View className="w-64 h-64 rounded-full border-[10px] border-blue-200 items-center justify-center">
          <View className="w-56 h-56 rounded-full bg-white shadow-inner items-center justify-center">
            <Image
              source={BannerConnect}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>

        <Text className="mt-5 text-xl font-sgbold text-gray-700">
          55M+ Engaged
        </Text>
        <Text className="text-orange-300 text-lg font-sgbold">Pioneers</Text>
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
    <View>
      <View className="mx-4 mt-6 bg-white rounded-3xl p-5" style={styles.itemShadow}>
        <Text className="text-lg font-sgbold text-gray-700">
          ⓟ Picore Team
        </Text>

        <Text className="text-gray-400 mt-2 leading-5">
          Follow our official media channels to keep up with the latest Pi Network
          updates and content! Beware of impersonators.
        </Text>

        <View className="flex-row mt-4">
          <SocialButton label="Twitter" icon="🐦" />
          <SocialButton label="Telegram" icon="✈️" />
        </View>
      </View>

      <FlatList
      data={posts}
      scrollEnabled
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mx-4 mt-4 bg-white rounded-2xl p-4" style={styles.itemShadow}>
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-indigo-300 rounded-full items-center justify-center mr-2">
                <Text className="text-white text-xs font-bold">π</Text>
              </View>
              <Text className="font-sgmedium text-gray-700">Admin</Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
              <Text className="text-xs text-gray-400 ml-1">
                12 tháng 8, 2025
              </Text>
            </View>
          </View>

          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-48 rounded-xl"
            resizeMode="cover"
          />

          <Text className="mt-3 font-sgmedium text-gray-700">
            {item.title}
          </Text>

          <Text className="text-gray-400 mt-1 leading-5">
            {item.excerpt}
          </Text>
        </View>
      )}
    />

      
    </View>
  )
}

const SocialButton = ({ icon, label }) => {
  return (
    <TouchableOpacity className="flex-row items-center bg-gray-50 px-4 py-2 rounded-full mr-3" style={styles.itemShadow}>
      <Text className="mr-2">{icon}</Text>
      <Text className="text-gray-600 font-medium">{label}</Text>
    </TouchableOpacity>
  );
}

const Aside = () => {
  const actions = [
    { icon: "👥", label: "0/0" },
    { icon: "⚡", label: "0.0 Pi/h" },
    { icon: "➡️", label: "Invite" },
    { icon: "⚠️", label: "Review" },
  ];
  return (
    <View className="ml-4 justify-between">
      {actions.map((item, i) => (
        <TouchableOpacity
          key={i}
          className="w-16 h-16 rounded-2xl items-center justify-center mb-3 border border-gray-100"
          style={styles.itemShadow}
        >
          <Text className="text-xl">{item.icon}</Text>
          <Text className="text-xs text-gray-500 mt-1">{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
    // <View className="absolute right-4 w-[15%] flex-col space-y-7 h-full justify-center">
    //   <TouchableOpacity className="justify-center items-center">
    //     <FontAwesome5 name="user-friends" size={26} color="#6b7280" />
    //     <Text className="font-bold mt-1">0/0</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity className="justify-center items-center">
    //     <MaterialCommunityIcons name="flash" size={26} color="#6b7280" />
    //     <Text className="font-bold mt-1">0,0 m/H</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity className="justify-center items-center">
    //     <FontAwesome5 name="share" size={26} color="#6b7280" />
    //     <Text className="font-bold mt-1">Invite</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity className="justify-center items-center">
    //     <MaterialCommunityIcons name="alert-decagram" size={26} color="#6b7280" />
    //     <Text className="font-bold mt-1">Review</Text>
    //   </TouchableOpacity>
    // </View>
  )
}

const NewI = () => {
  const BannerConnect = require("../../assets/image-app/nexkG-white.png");
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
    <View>
        {/* World Map Card */}
        <View className="mx-4 mt-4 bg-white rounded-3xl p-4 flex-row border border-gray-200" style={styles.itemShadow}>
          {/* Map */}
          <View className="flex-1 items-center">
            <View className="w-64 h-64 rounded-full border-8 border-blue-400 items-center justify-center">
              <View className="w-56 h-56 rounded-full" style={styles.circleShadow}>
                <Image
                  source={BannerConnect}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text className="mt-4 text-xl font-sgbold text-gray-900">
              55M+ Engaged
            </Text>
            <Text className="text-orange-500 font-sgbold text-lg">
              Pioneers
            </Text>
          </View>

          {/* Right actions */}
          <View className="justify-center">
            {[
              { label: "0/0", icon: "👥" },
              { label: "0.0 Pi/h", icon: "⚡" },
              { label: "Invite", icon: "➡️" },
              { label: "Review", icon: "⚠️" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemShadow}
                className="w-16 h-16 border border-gray-100 rounded-2xl items-center justify-center mb-3"
              >
                <Text className="text-lg">{item.icon}</Text>
                <Text className="text-xs text-gray-700 mt-1">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mt-6 px-4">
          <View className="bg-[#f9f7fb] rounded-2xl border border-gray-200">
            {/* Picore Team Card */}
            <View className="bg-gray-50 rounded-3xl p-4">
              <Text className="text-lg font-sgbold text-gray-900">
                ⓟ Picore Team
              </Text>

              <Text className="text-gray-600 mt-2 leading-5 font-sgregular">
                Follow our official media channels to keep up with the latest
                Pi Network updates and content! Beware of impersonators.
              </Text>

              <View className="flex-row mt-4">
                <TouchableOpacity className="flex-row items-center bg-white px-4 py-2 rounded-full mr-3">
                  <View className="mr-1">
                    <AntDesign name="x" size={13} color="black" />
                  </View>
                  <Text className="font-sgmedium">Twitter</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center bg-white px-4 py-2 rounded-full">
                  <View className="mr-1">
                    <FontAwesome6 name="telegram" size={19} color="black" />
                  </View>
                  <Text className="font-sgmedium">Telegram</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Post Card */}
            <FlatList
              data={posts}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="mx-4 mt-4 bg-white px-4 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <View className="flex-row items-center justify-between py-3">
                    <View className="flex-row items-center">
                      <View className="w-5 h-5 bg-[#7b77cd] rounded-full items-center justify-center mr-2">
                        <Text className="text-white text-xs font-sgbold">π</Text>
                      </View>
                      <Text className="font-sgmedium text-gray-900">Admin</Text>
                    </View>

                    <View className="flex-row">
                      <Ionicons name="calendar-clear-outline" size={14} className="" color="#9ca3af" />
                      <Text className="text-xs ml-1 text-gray-400 font-sgregular">
                        12 tháng 8, 2025
                      </Text>
                    </View>
                  </View>

                  {/* Image */}
                  <Image
                    source={{uri: item.thumbnail}}
                    className="w-full h-56 rounded-xl"
                    resizeMode="cover"
                  />

                  {/* Content */}
                  <View className="py-3 mb-2">
                    <Text className="text-gray-900 font-sgmedium text-base">
                      {item.title}
                    </Text>
                    <Text className="text-gray-500 leading-5 font-sgregular">
                      {item.excerpt}
                    </Text>
                  </View>
                </View>
              )}
            />

          </View>
          
        </View>
    </View>
  )
}

const StatsHeader = () => {
  return (
    <View className="mx-4 mt-4 bg-white rounded-3xl flex-row justify-between px-6 py-4 border border-gray-100" style={styles.itemShadow}>
      <StatItem value="55,888,888" label="Pioneers" />
      <Divider />
      <StatItem value="888 Pi/h" label="Invites" />
      <Divider />
      <StatItem value="88" label="Review" />
    </View>
  );
}

const StatItem = ({ value, label }) => {
  return (
    <View className="items-center flex-1">
      <Text className="text-lg font-sgmedium text-gray-700">{value}</Text>
      <Text className="text-gray-400 text-sm font-sgregular">{label}</Text>
    </View>
  );
}

const Divider = () => {
  return <View className="w-px bg-gray-200 mx-2" />;
}

const HomeScreen = () => {
  const { width } = Dimensions.get("window");
  const sideSpacing = 16;
  const navigation = useNavigation();
  const BannerConnect = require("../../assets/image-app/nexkG-white.png");

  return (
    <View className="flex-1 bg-gray-100 relative">
      <HeaderBar />
      <ScrollView className="relative z-50 mt-3 bg-white pt-4 rounded-t-3xl">
        <View className="pb-10">
          <StatsHeader />
          {/* <Exploit /> */}
          {/* <News /> */}
          <NewI />
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = {
  circleShadow: {
    backgroundColor: "#fff",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Android shadow
    elevation: 8,
  },
  // itemShadow: {
  //   backgroundColor: "#fff",
  //   // iOS shadow
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 6,
  //   // Android shadow
  //   elevation: 2,
  // },
  itemShadow: {
    backgroundColor: "#fff",

    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,

    // Android
    elevation: 3,
  },

};

export default HomeScreen;
