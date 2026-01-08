import { useRoute } from '@react-navigation/native';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const OrderListReturnStack = ({ navigation }) => {
  const route = useRoute();
  const layout = route.params?.layoutOrder ?? false

  const data = [
    {
      id: 'RT202511070008',
      order: '#021125-007',
      name: 'Lê Thị Tuyết Nga',
      phone: '021125002',
      status: 'Đã hoàn hàng',
      amount: '958.800 đ',
      time: '13:42 07/11/2025',
      statusType: 'returned',
    },
    {
      id: 'RT2051000006',
      order: '#021025-016',
      name: 'Nguyen Thi Anh Phuong',
      phone: '021025016',
      status: 'Đã hoàn tiền',
      amount: '959.800 đ',
      time: '18:06 02/10/2025',
      statusType: 'refunded',
    },
    {
      id: 'RT2051000005',
      order: '#120925-056',
      name: 'Anh Ngọc',
      phone: '120925006',
      status: 'Đã hoàn hàng',
      amount: '3.999.000 đ',
      time: '18:06 02/10/2025',
      statusType: 'returned',
    },
    {
      id: 'RT2051010004',
      order: '#240925-135',
      name: 'Hương Lê',
      phone: '240925026',
      status: 'Đã hoàn tiền',
      amount: '799.000 đ',
      time: '17:00 01/10/2025',
      statusType: 'refunded',
    },
    {
      id: 'RT2051000003',
      order: '#290925-160',
      name: 'Bùi Tùng Sơn',
      phone: '290925001',
      status: 'Đã hoàn hàng',
      amount: '922.893 đ',
      time: '16:57 01/10/2025',
      statusType: 'returned',
    },
    {
      id: 'RT2051000002',
      order: '#240925-131',
      name: 'Duy Tùng',
      phone: '190925004',
      status: 'Đã hoàn tiền',
      amount: '699.000 đ',
      time: '15:53 01/10/2025',
      statusType: 'refunded',
    },
    {
      id: 'RT2051000001',
      order: '#090925-034',
      name: 'Chị Thạch',
      phone: '030925001',
      status: 'Đã hoàn tiền',
      amount: '2.989.000 đ',
      time: '15:51 01/10/2025',
      statusType: 'refunded',
    },
  ];

  const StatusBadge = ({ type, text }) => {
  const base = 'px-3 py-1 rounded-full text-sm font-medium';
    if (type === 'returned') return <View className={`${base} bg-green-100`}><Text className="text-green-800">{text}</Text></View>;
    return <View className={`${base} bg-violet-100`}><Text className="text-violet-800">{text}</Text></View>;
  }

  const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => navigation.navigate('OrderReturnDetailStack')} activeOpacity={0.8} className="px-4 py-5 bg-white border-b border-gray-100">
    <View className="flex-row justify-between items-start">
      <View style={{ flex: 1 }}>
        <Text className="text-blue-600 font-sfmedium text-base">#{item.id}</Text>
        <Text className="text-blue-600 text-sm font-sfregular mt-1">{item.order}</Text>
        <Text className="text-gray-900 font-sfmedium text-f16 mt-1">{item.name}</Text>
        <Text className="text-gray-500 text-sm font-sfregular mt-1">{item.phone}</Text>
      </View>


      <View className="items-end ml-3">
        <StatusBadge type={item.statusType} text={item.status} />
        <Text className="text-black font-sfbold text-f17 mt-2">{item.amount}</Text>
        <Text className="text-gray-500 text-sm font-sfregular mt-1">{item.time}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View className='px-5 bg-gray-50 rounded-xl'>
        <View className='mt-6'>
          <Text className='text-gray-500 text-f15 font-sfregular'>2.207 đơn hàng</Text>
          <View className='mt-4'>
            <FlatList
            scrollEnabled
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderListReturnStack;
