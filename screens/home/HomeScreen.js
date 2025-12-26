import { useNavigation } from "@react-navigation/native";
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, useWindowDimensions, FlatList } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomNavigation from "../../components/common/BottomNavigation";

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

const Slider = () => {
  const { width } = useWindowDimensions();
  const [height, setHeight] = useState(0);
  const banner = require("../../assets/images/image-1.png");
  useEffect(() => {
    const { width: imgW, height: imgH } = Image.resolveAssetSource(banner);
    setHeight(width * imgH / imgW);
  }, [width]);

  return (
    <View className="mt-4 justify-center items-center">
      <Carousel
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={2000}
        width={width}
        height={height}
        data={[1, 2, 3]}
        renderItem={() => (
          <TouchableOpacity className="justify-center items-center">
            <Image
              source={banner}
              style={{ width: width-32, height: '100%' }}
              className="rounded-[40px] overflow-hidden"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const Banners = ({ banners }) => {
  return (
    <View className="px-4 mt-2">
      <View className="flex-row flex-wrap -mx-2">
        {banners.map((item, index) => {
          const isFull = index === 2;

          return (
            <TouchableOpacity
              key={item.id}
              className={`${isFull ? 'w-full' : 'w-1/2'} px-2 mb-4`}
            >
              <Image
                source={item.images}
                className={`w-full rounded-3xl ${isFull ? 'h-40' : 'h-36'}`}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

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

const HomeScreen = () => {
  const { width } = Dimensions.get("window");
  const sideSpacing = 16;
  const navigation = useNavigation();

  const banners = [
    { id: '1', images: require("../../assets/images/image-1.png") },
    { id: '2', images: require("../../assets/images/images.jpeg") },
    { id: '3', images: require("../../assets/images/image-2.webp") },
  ];

  return (
    <View className="flex-1 bg-gray-5 relative">
      <HeaderBar />
      <ScrollView className="relative z-50 mt-3 bg-white py-4 rounded-t-3xl">
        <View className="px-4">
          <Text className="text-xl font-bold">{getGreeting()}</Text>
        </View>

        <Slider />
        <Banners banners={banners} />
      </ScrollView>

      <BottomNavigation />
    </View>
  );
};

export default HomeScreen;
