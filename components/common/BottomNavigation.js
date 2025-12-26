import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, useWindowDimensions, FlatList } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons'

export default function BottomNavigation() {
    const navigation = useNavigation()
    const route = useRoute()

    const tabs = [
        { name: 'Home', icon: 'home' },
        { name: 'Product', icon: 'search' },
        { name: 'Customer', icon: 'person' },
    ]

    return (
        <View className="absolute bottom-0 left-0 right-0 justify-center items-center z-50">
            <View className="flex-row justify-between w-[auto] bg-[#0000004c] rounded-[50px] px-2 py-4">
                {
                    tabs.map((tab, index) => (
                        <View key={index} className={`w-14 h-14 ${route.name === tab.name?'bg-black':'bg-gray-300'} mx-2 rounded-full justify-center items-center`}>
                            <Ionicons
                                name={tab.icon}
                                size={24}
                                color={route.name === tab.name ? 'white' : 'black'}
                                onPress={() => navigation.navigate(tab.name)}
                            />
                        </View>
                    ))
                }
            </View>
        </View>
    )
}