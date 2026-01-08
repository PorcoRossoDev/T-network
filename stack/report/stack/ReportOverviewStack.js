import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  NativeModules,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SegmentedButtons } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReportBusinessChart from "../../../components/report/ReportBusinessChart";
import ReportOrtherChart from "../../../components/report/ReportOrtherChart";
import ReportTechnicalChart from "../../../components/report/ReportTechnicalChart";

const ReportOverviewStack = () => {
  const { width } = Dimensions.get("window");
  const sideSpacing = 16;
  const navigation = useNavigation();

  /*=== START: Tab - Biểu đồ ===*/
  const [index, setIndex] = useState(1);
  const segments = [
    { value: 0, label: "Kinh doanh" },
    { value: 1, label: "Kỹ thuật" },
    { value: 2, label: "Khác" },
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

  const [paddingHeader, setPaddingHeader] = useState(
    Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50
  );

  useEffect(() => {
    if (Platform.OS === "ios") {
      const { StatusBarManager } = NativeModules;
      StatusBarManager.getHeight((statusBarFrameData) => {
        setPaddingHeader(statusBarFrameData.height);
      });
    }
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-gray-50 relative">
      {/* <LinearGradient
        colors={[
          '#b71c1c', // đậm nhất
          '#d32f2f',
          '#e53935',
          '#f85b5f',
          '#ff8a80',
          'rgba(255,255,255,0.6)',
          '#ffffff',
        ]}
        locations={[0, 0.2, 0.35, 0.5, 0.7, 0.85, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 400,
          zIndex: 10,
          paddingTop:
            Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
        }}
      /> */}

      <LinearGradient
        colors={[
          "#b71c1c", // đậm nhất
          "#d32f2f",
          "#e53935",
          "#f85b5f",
          "#ff8a80",
          "rgba(255,255,255,0.6)", // trắng mờ
          "#ffffff", // trắng hẳn
        ]}
        locations={[0, 0.25, 0.45, 0.65, 0.8, 0.95, 1]} // 👈 fade trắng chỉ chiếm 5% cuối
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 300, // hoặc 350 nếu muốn tổng thể ngắn hơn
          zIndex: 10,
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight : insets.top,
        }}
      />

      <View
        className="pt-3 px-5 pb-5 justify-center items-center relative z-50 bg-[#c9252b]_"
        style={{ marginTop: Platform.OS=='ios'?paddingHeader:0 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-1/2 translate-[50%] lef-5 w-full h-full z-50"
        >
          <ArrowLeftIcon color="white" width="25" height="25" />
        </TouchableOpacity>
        <Text className="text-white font-sfbold text-f20 relative z-90">
          Báo cáo
        </Text>
      </View>
      <ScrollView className="relative z-50 mt-0">
        <View className="">
          <View className="mb-4 px-5">
            <View className="bg-red-400 rounded-md p-0.5">
              {Platform.OS === "ios" ? (
                <SegmentedControl
                  values={segments.map((s) => s.label.toUpperCase())}
                  selectedIndex={selectedIndex}
                  onChange={(event) => {
                    const newIndex = event.nativeEvent.selectedSegmentIndex;
                    setIndex(segments[newIndex].value);
                  }}
                  activeFontStyle={{ color: "#000" }}
                  fontStyle={{
                    fontSize: 14,
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                  style={{
                    height: 40, // ⬆️ tăng chiều cao tổng
                    // marginHorizontal: 20,
                    textTransform: "uppercase",
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

          <View className="flex-1 mt-1">
            {index === 0 && <ReportBusinessChart />}
            {index === 1 && <ReportTechnicalChart />}
            {index === 2 && <ReportOrtherChart />}
          </View>

          <View className="bg-gray-50 px-5"></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportOverviewStack;
