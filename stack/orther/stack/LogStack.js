import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const LogItem = ({ navigation, background='#000000', title=''}) => {
  return (
    <View>
    </View>
  )
}

const LogStack = ({ navigation }) => {
  const logType = {
    order: {
      icon: 'ShoppingCartIcon',
      background: '#1d4ed8',
      title: 'Đơn hàng',
      status: 10
    },
    customer: {
      icon: 'UserGroupIcon',
      background: '#16a34a',
      title: 'Khách hàng',
      status: 0
    },
    job: {
      icon: 'BriefcaseIcon',
      background: '#eab308',
      title: 'Công việc',
      status: 10
    },
    disbursement: {
      icon: 'CurrencyDollarIcon',
      background: '#10b981',
      title: 'Phiếu chi',
      status: 0
    },
  }

  const data = [
    {
      type: 'order',
      title: 'Tạo đơn hàng',
      message: 'Giao đơn #221025-118 107A Bùi Thị Xuân, phường Hai Bà Trưng, HN',
      user_created: 'Huy Huân',
      created_at: '2025-10-26 07:46:45',
      isRead: false,
    },
    {
      type: 'customer',
      title: 'Cập nhật khách hàng',
      message: 'Giao đơn #221025-118 107A Bùi Thị Xuân, phường Hai Bà Trưng, HN',
      user_created: 'Trần Văn Xuân',
      created_at: '2025-10-26 07:46:45',
      isRead: true,
    },
    {
      type: 'job',
      title: 'Cập nhật trạng thái công việc',
      message: 'Giao đơn #221025-118 107A Bùi Thị Xuân, phường Hai Bà Trưng, HN',
      user_created: 'Trần Văn Xuân',
      created_at: '2025-10-26 07:46:45',
      isRead: false,
    },
    {
      type: 'order',
      title: 'Hoàn thành công việc',
      message: 'Giao đơn #221025-118 107A Bùi Thị Xuân, phường Hai Bà Trưng, HN',
      user_created: 'Trần Văn Xuân',
      created_at: '2025-10-26 07:46:45',
      isRead: false,
    },
    {
      type: 'disbursement',
      title: 'Thêm mới phiếu chi',
      message: 'Giao đơn #221025-118 107A Bùi Thị Xuân, phường Hai Bà Trưng, HN',
      user_created: 'Trần Văn Xuân',
      created_at: '2025-10-26 07:46:45',
      isRead: true,
    },
  ]
  return (
    <View className='flex-1 bg-white'>
      <ScrollView className='px-4 bg-white flex-1 relative'>
        <View className='mt-6'>
          <View 
          // style={{
          //   backgroundColor: "white",
          //   borderRadius: 10,
          //   paddingVertical: 15,
          //   // paddingHorizontal: 15,
          //   // Shadow cho iOS
          //   shadowColor: "#000",
          //   shadowOffset: { width: 0, height: 4 },
          //   shadowOpacity: 0.1,
          //   shadowRadius: 6,
          //   // Shadow cho Android
          //   elevation: 6,
          // }}
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingVertical: 15,
            // iOS
            shadowColor: '#0e3f7e',           // màu gần giống web
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            // Android
            elevation: 2,
          }}
          className='flex-row flex-wrap justify-between items-center'>
            {
              Object.entries(logType).map(([key, item], index) => {
                const Icon = HeroOutline[item.icon]
                return (
                  <TouchableOpacity key={key} className='w-1/4 justify-center items-center'>
                    <View className='w-14 h-14 justify-center items-center rounded-full' style={{backgroundColor: item.background}}>
                      <Icon size={22} color='#fff' />
                      {item.status > 0 && (
                        <Text className='bg-red-600 text-white px-1 rounded-lg py-0.5 absolute -top-2 -right-2 border border-white font-sfregular text-f13'>10</Text>
                      )}
                      </View>
                    <Text className='font-sfmedium text-f14 mt-2'>{item.title}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>

          <View className='mb-5'>
            <View className='flex-row justify-between mt-6'>
              <Text className='font-sfmedium text-gray-500 text-f15'>Tất cả hoạt động</Text>
              <Text className='font-sfmedium text-blue-500 text-f15'>Đọc tất cả (22)</Text>
            </View>
            <View className='border border-gray-300 rounded-xl mt-4 overflow-hidden'>
              {
                data.map((item, index) => {
                  const typeConfig = logType[item.type];
                  const Icon = typeConfig ? HeroOutline[typeConfig.icon] : HeroOutline.BellIcon; // fallback nếu không có type
                  const bgColor = typeConfig ? typeConfig.background : '#9ca3af';
                  return (
                    <View className={`flex-row p-4 border-b border-gray-300 ${!item.isRead ? 'bg-blue-50' : ''} gap-x-3 overflow-hidden`}>
                      <View className='w-[10%]'>
                        <View className='w-10 h-10 justify-center items-center rounded-full' style={{backgroundColor: bgColor}}>
                          <Icon size={20} color='#fff' />
                        </View>
                      </View>
                      <View className='flex-1'>
                        <Text className='font-sfmedium text-f15'>{item.title}</Text>
                        <Text className='font-sfregular text-f13 text-gray-500 mt-1'>{item.message} <Text className='font-sfbold text-f13 text-black'> bởi {item.user_created}</Text></Text>
                        <Text className='font-sfregular text-f13 text-gray-500 mt-1'>{item.created_at}</Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LogStack;
