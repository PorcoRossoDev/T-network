import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeModules,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReportItemCustomer from "../../../components/report/ReportItemCustomer";
import ReportItemOrder from "../../../components/report/ReportItemOrder";

const ReportCustomerStack = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  /*=== START: Tab - Biểu đồ ===*/
  const [index, setIndex] = useState(0);
  const segments = [
    { value: 0, label: "Công việc đơn hàng" },
    { value: 1, label: "Công việc" },
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
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 bg-white flex-1 relative">
        <View
          className="mt-5 px-5"
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            // paddingVertical: 16,
            // Shadow cho iOS
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            // Shadow cho Android
            elevation: 6,
          }}
        >
          <View className="py-3">
            <View className="flex-row justify-between">
              <Text className="font-sfmedium text-f16">Nguyễn Mạnh Chiến</Text>
              <View className="flex-row flex-wrap items-center">
                <Text className="text-f16 font-sfmedium">21 công việc</Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-1">
              <View>
                <Text className="text-gray-500 font-sfregular text-f15 mt-1.5">
                  Thu đơn hàng
                </Text>
                <Text className="font-sfmedium text-center text-f14 mt-1">
                  950.000
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 font-sfregular text-f15">
                  Thu công việc
                </Text>
                <Text className="font-sfmedium text-center text-f14 mt-1.5">
                  450.000
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 font-sfregular text-f15 text-right">
                  Tổng thu
                </Text>
                <Text className="font-sfmedium text-center text-f14 text-green-600 mt-1.5">
                  1.400.000
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mb-4 mt-7">
          <View className="bg-gray-200 rounded-xl p-0.5">
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
                  color: "#000",
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
                    backgroundColor: index === s.value ? "#fff" : "transparent",
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
        <View className="mt-3">
          {index === 0 && (
            <>
              <ReportItemCustomer />
              <ReportItemCustomer />
              <ReportItemCustomer />
              <ReportItemCustomer />
              <ReportItemCustomer />
            </>
          )}
          {index === 1 && (
            <>
              <ReportItemOrder />
              <ReportItemOrder />
              <ReportItemOrder />
              <ReportItemOrder />
              <ReportItemOrder />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportCustomerStack;
