import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

import {
  Dimensions,
  NativeModules,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { BellIcon, ChevronRightIcon } from "react-native-heroicons/solid";
import { SegmentedButtons } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BarHomeChart from "../../components/charts/BarHomeChart";
import BarSalesChart from "../../components/charts/BarSalesChart";
import {
  ActionItem,
  BottomSheetActions,
  OrderNavigation,
  Chart
} from "../../components/home";

const HomeScreen = () => {
  const { width } = Dimensions.get("window");
  const sideSpacing = 16;
  const navigation = useNavigation();

  /*=== START: Tab - Biểu đồ ===*/
  const [index, setIndex] = useState(0);
  const times = [
    { label: 'Năm nay', value: '0' },
    { label: '6 Tháng', value: '1' },
    { label: 'Tháng này', value: '2' },
  ];
  const [isFocus, setIsFocus] = useState(false);
  const [selected, setSelected] = useState("");
  const segments = [
    { value: 0, label: "Doanh thu" },
    { value: 1, label: "Nguồn khách" },
    { value: 2, label: "Công việc" },
    { value: 3, label: "Ngân sách" },
  ];
  /*=== END: Tab - Biểu đồ ===*/

  /*=== START: Modal - Thao tác nhanh ===*/
  const selectedIndex = segments.findIndex((s) => s.value === index);
  const bottomSheetRef = useRef(null);
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const actionList = [
    {
      id: "1",
      name: "Thêm sản phẩm",
      icon: "FolderIcon",
      navigateTo: { name: "Product", screen: "ProductAddStack" },
      background: "#3B82F6",
    },
    {
      id: "2",
      name: "Tạo đơn hàng",
      icon: "ShoppingCartIcon",
      navigateTo: { name: "Order", screen: "OrderAddStack" },
      background: "#22C55E",
    },
    {
      id: "3",
      name: "Quản lý nhân viên",
      icon: "UserGroupIcon",
      navigateTo: { name: "Product", screen: "ProductAddStack" },
      background: "#2563EB",
    },
    {
      id: "4",
      name: "Tạo phiếu chi",
      icon: "ClipboardIcon",
      navigateTo: { name: "Disbursement", screen: "DisbursementOverviewStack" },
      background: "#6366F1",
    },
    {
      id: "5",
      name: "Báo cáo doanh thu",
      icon: "ChartPieIcon",
      navigateTo: { name: "Report", screen: "ReportOverviewStack" },
      background: "#10B981",
    },
    {
      id: "6",
      name: "Quản lý kho",
      icon: "FolderIcon",
      navigateTo: { name: "Product", screen: "ProductAddStack" },
      background: "#F97316",
    },
    {
      id: "7",
      name: "Quản lý giao hàng",
      icon: "FolderIcon",
      navigateTo: { name: "Product", screen: "ProductAddStack" },
      background: "#FACC15",
    },
    {
      id: "8",
      name: "Tạo phiếu kiểm hàng",
      icon: "FolderIcon",
      navigateTo: { name: "Product", screen: "ProductAddStack" },
      background: "#EC4899",
    },
    {
      id: "9",
      name: "Số quỹ",
      icon: "FolderIcon",
      navigateTo: { name: "Product", screen: "ProductAddStack" },
      background: "#14B8A6",
    },
    {
      id: "10",
      name: "Công việc",
      icon: "FolderIcon",
      navigateTo: { name: "Job", screen: "JobOverviewStack" },
      background: "#8B5CF6",
    },
    {
      id: "all",
      name: "Xem thêm",
      icon: "FolderPlusIcon",
      navigateTo: { name: "Product", screen: "ProductAddStack" },
      background: "#EF4444",
    },
  ];
  const [activeActions, setActiveActions] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "10",
    "all",
  ]);
  const actionListActive = actionList.filter((item) =>
    activeActions.includes(item.id)
  );
  const handleActionToggle = (id) => {
    setActiveActions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  /*=== END: Modal - Thao tác nhanh ===*/

  const [paddingHeader, setPaddingHeader] = useState(
    Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50
  );

  useEffect(() => {
    if (Platform.OS === "ios") {
      const { StatusBarManager } = NativeModules;
      StatusBarManager.getHeight((statusBarFrameData) => {
        setPaddingHeader(statusBarFrameData.height + 20);
      });
    }
  }, []);

  const [visible, setVisible] = React.useState(false);
  const insets = useSafeAreaInsets();

  const DropDownChart = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        data={segments}
        labelField="label"
        valueField="value"
        placeholder="Chọn mục"
        value={0}
        onChange={item => setIndex(item.value)}
        renderLeftIcon={() => (
          <Text
            numberOfLines={1}
            ellipsizeMode="thomeail"
            style={styles.selectedText}
          >
            {segments.find(s => s.value === index)?.label}
          </Text>
        )}
        renderItem={(item) => (
          <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                color: '#111',
                fontFamily: 'SF-Pro-Display-Regular',
              }}
            >
              {item.label}
            </Text>
          </View>
        )}
      />
    )
  }

  const HeaderBar = ({ title = 'Doanh thu bán hàng', time = '17:30 20/01/2025' }) => {
    return (
      <View className='flex-row justify-between mb-3 px-4'>
        <View className="">
          <Text className={`text-f15 uppercase font-sfbold ${Platform.OS=='android'?'leading-6':''}`}>{title}</Text>
          <Text className="text-gray-500 mt-1 text-f12">
            Cập nhật lúc {time}
          </Text>
        </View>
        {/* <View className='w-[30%]' ><DropDownChart /></View> */}
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      /> */}

      <View
        className="pt-3 px-4 pb-5 flex flex-row justify-between relative z-50 bg-[#c9252b]"
      >
        <Text className="text-white font-sfbold text-f20">Scent Home</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Orther", { screen: "LogStack" })}
          className="relative"
        >
          <BellIcon color="white" width="25" height="25" />
          <Text
            className={`w-5 h-5 text-center leading-5 text-white rounded-full font-bold text-f10 absolute ${Platform.OS == "ios" ? "-top-[5px]" : "top-[-7px]"
              } right-[-5px] bg-yellow-400`}
          >
            10
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="relative z-50 mt-5">
        <View className="">
          
          <View className='flex-1 px-4 mt-1'>
            <View className="bg-white py-4 rounded-xl"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.07,
                shadowRadius: 16,
                elevation: 1,
              }}
              >
              {index === 0 && <><HeaderBar title={'Doanh thu'} time={'09:19 18/07/2025'} /><BarSalesChart /></>}
              {index === 1 && <><HeaderBar title={'Nguồn khách'} time={'17:30 20/01/2025'} /><BarSalesChart /></>}
              {index === 2 && <><HeaderBar title={'Công việc'} time={'04:30 10/01/2025'} /><BarSalesChart /></>}
              {index === 3 && <><HeaderBar title={'Ngân sách'} time={'04:30 10/01/2025'} /><BarSalesChart /></>}
            </View>
          </View>

          <View className="px-4 mt-3">
            <View className="bg-gray-100 rounded-xl p-0.5">
              {Platform.OS === "ios" ? (
                <SegmentedControl
                  values={segments.map((s) => s.label)}
                  selectedIndex={selectedIndex}
                  onChange={(event) => {
                    const newIndex = event.nativeEvent.selectedSegmentIndex;
                    setIndex(segments[newIndex].value);
                  }}
                />
              ) : (
                <SegmentedButtons
                  value={index}
                  onValueChange={(val) => setIndex(val)}
                  buttons={segments.map((s, i) => ({
                    value: s.value,
                    label: s.label,
                    style: {
                      borderRadius: 10,
                      //borderColor: '#007AFF',
                      borderWidth: 0,
                      backgroundColor:
                        index === s.value ? "#fff" : "transparent",
                      //marginLeft: i === 0 ? 0 : -1, // dính liền các nút
                    },
                    labelStyle: {
                      //color: index === s.value ? 'white' : '#007AFF',
                      //fontWeight: '500',
                      fontSize: 14,
                    },
                  }))}
                  style={{
                    // margin:9,
                    borderRadius: 10,
                    padding: 3,
                    //overflow: 'hidden',
                    borderColor: "#007AFF",
                    borderWidth: 0,
                    backgroundColor: "#ecebeb",
                  }}
                />
              )}
            </View>
          </View>

          <View className="px-5 mb-3 mt-2 hidden">
            <TouchableOpacity
              className="flex-row justify-between py-4 px-5 mt-4 bg-white rounded-xl"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.07,
                shadowRadius: 16,
                elevation: 1,
              }}
            >
              <Text className="font-sfmediaum text-[15px]">
                Danh sách đơn hàng hôm nay
              </Text>
              <View>
                <ChevronRightIcon size={19} color={"#000"} />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            {/* Thao tác nhanh */}
            <View
              className=""
            >
              <View className="flex flex-row justify-between mt-5 px-5">
                <Text className="uppercase font-sfmedium text-f15">
                  Thao tác nhanh
                </Text>
                <TouchableOpacity onPress={openSheet}>
                  <Text className="text-blue-600 text-f15 font-sfmedium">
                    Tuỳ chỉnh
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap mt-6">
                {actionListActive.map((item, index) => (
                  <View key={index} className="w-1/4">
                    <ActionItem
                      name={item.name}
                      icon={item.icon}
                      variant={item?.variant ?? "solid"}
                      navigateTo={item.navigateTo}
                      navigation={navigation}
                      background={item.background}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Danh sách đơn hàng */}
          <View className="mt-3 mb-3 ">
            <OrderNavigation />
          </View>
        </View>
      </ScrollView>
      <BottomSheetActions
        ref={bottomSheetRef}
        onClose={closeSheet}
        actionList={actionList}
        activeActions={activeActions}
        handleActionToggle={handleActionToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#f3f4f6',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: 'sfbold',
  },
  selectedText: {
    fontSize: 14,
    color: '#000',
    width: '90%', // cắt khi dài quá
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#374151',
  },
});

export default HomeScreen;
