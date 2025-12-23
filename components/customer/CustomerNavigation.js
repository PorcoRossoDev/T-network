import { FlatList, Text, TouchableOpacity, View, Platform } from "react-native";
import * as HeroOutline from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';


const orders = [
  {
    id: "1",
    title: "Tổng đơn hàng",
    value: "225.435.678 ₫",
    count: 117,
    color: "bg-blue-500",
    shadow: "#3b82f6",
    icon: HeroOutline.ShoppingCartIcon,
  },
  {
    id: "2",
    title: "Hoàn thành",
    value: "225.435.678 ₫",
    count: 90,
    color: "bg-green-500",
    shadow: "#22c55e",
    icon: HeroOutline.CheckCircleIcon,
  },
  {
    id: "3",
    title: "Đã thanh toán",
    value: "225.435.678 ₫",
    count: 88,
    color: "bg-purple-500",
    shadow: "#a855f7",
    icon: HeroOutline.CreditCardIcon,
  },
  {
    id: "4",
    title: "Chưa thanh toán",
    value: "225.435.678 ₫",
    count: 21,
    color: "bg-yellow-400",
    shadow: "#eab308",
    icon: HeroOutline.ClockIcon,
  },
  {
    id: "5",
    title: "Hẹn giao",
    value: "225.435.678 ₫",
    count: 17,
    color: "bg-sky-400",
    shadow: "#0ea5e9",
    icon: HeroOutline.TruckIcon,
  },
  {
    id: "6",
    title: "Công nợ",
    value: "225.435.678 ₫",
    count: 0,
    color: "bg-red-400",
    shadow: "#ef4444",
    icon: HeroOutline.ArrowDownCircleIcon,
  },
];

export default function CustomerNavigation() {

  const navigation = useNavigation();
  return (
    <View className="flex-1 px-5 pt-0 mt-3">
      <Text className="text-f15 font-sfmedium uppercase text-gray-800 mb-4">
        Danh Sách Khách hàng
      </Text>

      <FlatList
        scrollEnabled={false}
        data={orders}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Customer', { screen: 'CustomerListStack' })}
              activeOpacity={0.9}
              className="mb-3"
            >
              <View
                className={`flex-row items-center bg-white p-3 rounded-3xl ${Platform.OS=='ios'?'border-gray-200':'border-gray-200'}  border`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.03,
                  shadowRadius: 12,
                  elevation: 0,
                }}
              >
                {/* Icon */}
                <View
                  className={`w-11 h-11 rounded-full ${item.color} border border-gray-200 items-center justify-center shadow-lg mr-4`}
                  style={{
                    shadowColor: "#ef4444",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.2,
                    shadowRadius: 12,
                    elevation: 1,
                  }}
                >
                  <Icon size={20} color={'#fff'} strokeWidth={2} />
                </View>

                {/* Text */}
                <View className="flex-1">
                  <Text className="text-f16 font-sfmedium text-gray-800">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500">{item.value}</Text>
                </View>

                {/* Badge */}
                <View
                  className={`px-2 py-1 rounded-full bg-gray-100 bg-opacity-20 flex flex-row items-center justify-center`}
                >
                  <Text className="text-black text-xs font-sfmedium">
                    {item.count}
                  </Text>
                  <Text>
                      <HeroOutline.ChevronRightIcon size='13' />
                    </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
