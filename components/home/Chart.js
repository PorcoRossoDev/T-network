import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";

// Dữ liệu mẫu (Giữ nguyên dữ liệu của bạn, điều chỉnh màu sắc để trông tươi hơn)
const orders = [
  {
    id: "1",
    title: "Tổng đơn hàng",
    value: "225.435.678 ₫",
    count: 117,
    // Màu sắc tương tự Blue/Cobalt trong ảnh
    color: "bg-blue-600", 
    text_color: "text-blue-600", 
    icon: HeroOutline.ShoppingCartIcon,
  },
  {
    id: "2",
    title: "Hoàn thành",
    value: "225.435.678 ₫",
    count: 90,
    // Màu xanh lá cây nổi bật
    color: "bg-green-600",
    text_color: "text-green-600",
    icon: HeroOutline.CheckCircleIcon,
  },
  {
    id: "3",
    title: "Đã thanh toán",
    value: "225.435.678 ₫",
    count: 88,
    // Màu tím/Purple nổi bật
    color: "bg-purple-600",
    text_color: "text-purple-600",
    icon: HeroOutline.CreditCardIcon,
  },
  {
    id: "4",
    title: "Chưa thanh toán",
    value: "225.435.678 ₫",
    count: 21,
    // Màu xanh lá cây nhạt hơn (Teal/Cyan)
    color: "bg-teal-500", 
    text_color: "text-teal-500",
    icon: HeroOutline.ClockIcon,
  },
  {
    id: "5",
    title: "Hẹn giao",
    value: "225.435.678 ₫",
    count: 17,
    // Màu xanh dương nhạt (Sky Blue)
    color: "bg-sky-500", 
    text_color: "text-sky-500",
    icon: HeroOutline.TruckIcon,
  },
  {
    id: "6",
    title: "Công nợ",
    value: "225.435.678 ₫",
    count: 0,
    // Màu đỏ Coral
    color: "bg-red-500",
    text_color: "text-red-500",
    icon: HeroOutline.ArrowDownCircleIcon,
  },
];

export default function OrderListScreen() {
  return (
    // Nền tổng thể: Màu xám nhạt (bg-gray-50 hoặc bg-white)
    // để các item nổi lên
    <View className="flex-1 bg-white px-5 pt-0"> 
      
      <Text className="text-xl font-bold text-gray-800 mb-4 mt-2"> 
        Danh Sách Đơn Hàng
      </Text>

      <FlatList
        scrollEnabled={false}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              className="mb-4" // MarginBottom lớn hơn chút
            >
              <View
                // Nền trắng, bo góc vừa phải (Rounded-lg), đổ bóng nhẹ
                className="flex-row items-center p-4 rounded-lg bg-white" 
                style={{
                  // Tạo đổ bóng mềm mại (tương tự như Neumorphism)
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 10,
                  elevation: 5,
                }}
              >
                {/* Icon Container */}
                <View
                  // Màu nền đậm, bo tròn hoàn hảo
                  className={`w-12 h-12 rounded-full ${item.color} items-center justify-center mr-4`}
                >
                  <Icon size={24} color="white" strokeWidth={2} />
                </View>

                {/* Text Nội dung */}
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {item.value}
                  </Text>
                </View>

                {/* Badge (Số lượng) */}
                <View
                  // Background nhạt 10%, text màu đậm để dễ đọc
                  className={`px-3 py-1 rounded-full ${item.color} bg-opacity-10`} 
                >
                  <Text className={`text-base font-bold ${item.text_color}`}>
                    {item.count}
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