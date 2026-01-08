import { ScrollView, Text, View } from 'react-native';

const OrderReturnDetailStack = ({ navigation }) => {

  const data = {
    returnId: "#RT202511070008",
    createdAt: "13:42 07/11/2025",
    creator: "Mai Hà TMĐT",
    status: "Đã hoàn hàng",
    orderId: "#021125-007",
    orderDate: "01:17 02/11/2025",
    orderStatus: "Hủy đơn",
    orderTotal: "781.203 đ",
    customerName: "Lê Thị Tuyết Nga",
    customerId: "021125002",
    products: [
      {
        name: "Tinh dầu InterContinental Hotel 50ml",
        qty: 1,
        refund: "958.800 đ",
      },
    ],
    summary: {
      productCount: 1,
      totalRefund: "958.800 đ",
    },
    history: [
      { time: "15:17 13/11/2025", user: "Trần Văn Xuân", action: "Nhận hàng vào kho phiếu trả hàng #RT202511070008" },
      { time: "13:54 07/11/2025", user: "Trần Văn Xuân", action: "Duyệt phiếu trả hàng #RT202511070008" },
      { time: "13:42 07/11/2025", user: "Mai Hà TMĐT", action: "Tạo yêu cầu đổi trả #RT202511070008 cho đơn hàng #021125-007" },
    ],
  };

  const Card = ({ title, children }) => (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
      <Text className="text-gray-900 font-sfbold text-[16px] mb-3">{title}</Text>
      {children}
    </View>
  );


  return (
      <ScrollView className="flex-1 px-4 pt-4">

        <View className="mt-4">
          {/* Thông tin yêu cầu trả hàng */}
          <Card title="Thông tin yêu cầu trả hàng">
            <View className="flex-row justify-between">
              <Text className="text-gray-700 font-sfregular text-[15px]">Mã trả hàng</Text>
              <Text className="font-sfmedium text-gray-900">{data.returnId}</Text>
            </View>

            <View className="flex-row justify-between mt-3">
              <Text className="text-gray-700 font-sfregular text-[15px]">Ngày tạo</Text>
              <Text className="font-sfmedium text-gray-900">{data.createdAt}</Text>
            </View>

            <View className="flex-row justify-between mt-3 items-center">
              <Text className="text-gray-700 font-sfregular text-[15px]">Người tạo</Text>
              <Text className="font-sfmedium text-gray-900">{data.creator}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-700 font-sfregular text-[15px]">Trạng thái</Text>
              <View className="mt-4 self-start bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-800 font-sfmedium">{data.status}</Text>
              </View>
            </View>

            
          </Card>
        </View>

        {/* Thông tin đơn hàng gốc */}
        <Card title="Thông tin đơn hàng gốc">
          <View className="flex-row justify-between">
            <Text className="text-gray-700 font-sfregular text-[15px]">Mã đơn hàng</Text>
            <Text className="font-sfmedium text-blue-600">{data.orderId}</Text>
          </View>

          <View className="flex-row justify-between mt-3">
            <Text className="text-gray-700 font-sfregular text-[15px]">Ngày tạo đơn hàng</Text>
            <Text className="font-medium text-gray-900">{data.orderDate}</Text>
          </View>

          <View className="flex-row justify-between mt-3">
            <Text className="text-gray-700 font-sfregular text-[15px]">Trạng thái đơn hàng</Text>
            <Text className="font-medium text-red-600">{data.orderStatus}</Text>
          </View>

          <View className="flex-row justify-between mt-3">
            <Text className="text-gray-700 font-sfregular text-[15px]">Tổng tiền đơn hàng</Text>
            <Text className="font-sfmedium text-gray-900">{data.orderTotal}</Text>
          </View>
        </Card>

        {/* Thông tin khách hàng */}
        <Card title="Thông tin khách hàng">
          <View className="flex-row justify-between">
            <Text className="text-gray-700 font-sfregular text-[15px]">Tên khách hàng</Text>
            <Text className="font-medium text-gray-900">{data.customerName}</Text>
          </View>

          <View className="flex-row justify-between mt-3">
            <Text className="text-gray-700 font-sfregular text-[15px]">Mã khách hàng</Text>
            <Text className="font-sfmedium text-gray-900 text-md">{data.customerId}</Text>
          </View>
        </Card>

        {/* Danh sách sản phẩm trả */}
        <Card title="Danh sách sản phẩm trả">
          <View className="flex-row justify-between border-b border-gray-100 pb-2">
            <Text className="text-gray-500 font-sfmedium text-md">SẢN PHẨM</Text>
            <Text className="text-gray-500 font-sfmedium text-md">SỐ LƯỢNG / TIỀN HOÀN</Text>
          </View>

          {data.products.map((p, i) => (
            <View key={i} className="flex-row justify-between mt-3 items-center">
              <Text className="text-gray-800 font-sfmedium w-[50%]">{p.name}</Text>
              <View className="items-end">
                <Text className="text-gray-700 text-md">{p.qty}</Text>
                <Text className="text-green-700 font-sfmedium text-md">{p.refund}</Text>
              </View>
            </View>
          ))}

          <View className="flex-row justify-between mt-4 items-center border-t border-gray-100 pt-3">
            <Text className="text-gray-700 text-md font-sfmedium">Tổng tiền hoàn:</Text>
            <Text className="text-green-700 text-md font-bold">{data.summary.totalRefund}</Text>
          </View>
        </Card>

        {/* Lịch sử xử lý */}
        <Card title="Lịch sử xử lý">
          {data.history.map((h, idx) => (
            <View key={idx} className="flex-row items-start mb-3">
              <View className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
              <View className="flex-1">
                <Text className="text-gray-800 font-sfmedium text-[15px]">{h.action}</Text>
                <Text className="text-gray-500 text-md mt-1 font-sfregular">
                  {h.time} — {h.user}
                </Text>
              </View>
            </View>
          ))}
        </Card>
    </ScrollView>
  );
};

export default OrderReturnDetailStack;
