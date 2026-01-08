import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as HeroSolid from "react-native-heroicons/solid";
import BarChartJob from "../../../components/order/BarChartJob";
import JobNavigation from "../../../components/job/JobNavigation"

const JobOverviewStack = ({ navigation }) => {
  const goOrderCancelled = () => {
    navigation.navigate("OrderCancelledStack");
  };
  return (
    <ScrollView>
      <View className="bg-gray-100">

        {/* Tạo đơn hàng */}
        <View className='justify-center items-center'>
          <View className="w-[85%] py-10 mt-10 justify-center items-center bg-white rounded-t-2xl">
            <TouchableOpacity
              onPress={() => navigation.navigate("JobAddStack")}
              className="justify-center text-center"
            >
              <View className="justify-center items-center">
                <View className="w-[50px] h-[50px] justify-center items-center bg-blue-600 rounded-full">
                  <HeroSolid.PlusIcon size={25} color={"white"} />
                </View>
              </View>
              <Text className="text-f16 mt-4 font-sfmedium">Tạo công việc</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="">
          {/* Biểu đồ */}
          <View className='bg-white'>
            <View className="pt-5 mb-7 px-4">
              <BarChartJob />
            </View>
          </View>

          {/* Danh sách đơn hàng */}
          <View className="mt-3">
            <JobNavigation />
          </View>
        </View>

        {/* Đơn hàng */}
        <View className="bg-white mt-4 flex-1 w-full px-4 mb-6">
          <TouchableOpacity
            onPress={() => navigation.navigate("JobPenddingStack")}
            className="flex-row justify-between items-center py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <HeroSolid.ClipboardDocumentListIcon
                size={30}
                color={"#6b7280"}
              />
              <Text className="pl-3 font-sfregular text-f15">
                Công việc cần xử ý
              </Text>
            </View>
            <View className="flex-row flex-wrap items-center">
              <Text className="text-f12">219</Text>
              <Text className="ml-2">
                <HeroSolid.ChevronRightIcon size={17} color={"#9ca3af"} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("JobCancelledStack")}
            className="flex-row justify-between items-center py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <HeroSolid.ClipboardDocumentCheckIcon
                size={30}
                color={"#6b7280"}
              />
              <Text className="pl-3 font-sfregular text-f15">
                Công việc quá hạn
              </Text>
            </View>
            <View className="flex-row flex-wrap items-center">
              <Text className="text-f12">0</Text>
              <Text className="ml-2">
                <HeroSolid.ChevronRightIcon size={17} color={"#9ca3af"} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("JobCancelledStack")}
            className="flex-row justify-between items-center py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <HeroSolid.ReceiptRefundIcon size={30} color={"#6b7280"} />
              <Text className="pl-3 font-sfregular text-f16">
                Công việc huỷ
              </Text>
            </View>
            <View className="flex-row flex-wrap items-center">
              <Text className="text-f12">50</Text>
              <Text className="ml-2">
                <HeroSolid.ChevronRightIcon size={17} color={"#9ca3af"} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default JobOverviewStack;
