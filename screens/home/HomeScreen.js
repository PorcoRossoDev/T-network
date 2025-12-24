import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import {
  Dimensions,
  NativeModules,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";

const HeaderBar = () => {
  const logo = require("../../assets/images/logo.webp");
  return (
      <View className="px-4 py-2 flex flex-row justify-between rounded-b-3xl relative z-50 bg-white">
        <TouchableOpacity className="relative">
          <Image source={logo} className="w-9 h-9" resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity className="relative w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
          <FontAwesome name="user" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>
  )
}

const HomeScreen = () => {
  const { width } = Dimensions.get("window");
  const sideSpacing = 16;
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-50">
      <HeaderBar />
      <ScrollView className="relative z-50 mt-5 bg-white px-4 py-4 rounded-t-3xl">
        <View className="">
          <Text className="text-xl font-bold">Chào buổi chiều!</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
