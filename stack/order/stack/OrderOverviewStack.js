import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";
import OrderNavigation from '../../../components/home/OrderNavigation';
import BarChartOrder from '../../../components/order/BarChartOrder';

const OrderOverviewStack = ({ navigation }) => {

  const goOrderCancelled = () => {
    navigation.navigate('OrderCancelledStack')
  }

  return (
    <ScrollView className='flex-1'>
      <View className=''>
        <View className='justify-center bg-gray-100 items-center'>
          {/* Tạo đơn hàng */}
          <View className='w-[85%] py-10 mt-10 justify-center items-center bg-white rounded-t-2xl'>
            <TouchableOpacity onPress={() => navigation.navigate('OrderAddStack')} className='justify-center text-center'>
              <View className='justify-center items-center'>
                <View className='w-[50px] h-[50px] justify-center items-center bg-blue-600 rounded-full'>
                  <HeroSolid.PlusIcon size={25} color={'white'} />
                </View>
              </View>
              <Text className='text-f16 mt-4 font-sfmedium'>Tạo đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
        

        <View className='pb-4 bg-gray-100'>

          {/* Biểu đồ */}
          <View className='pt-5 mb-7 px-4 bg-white'>
            <BarChartOrder />
          </View>

          {/* Danh sách đơn hàng */}
          <View className=''>
            <OrderNavigation />
          </View>
        </View>

        {/* Đơn hàng */}
        <View className='bg-white px-5 mb-3'>
          <TouchableOpacity onPress={() => navigation.navigate('OrderPenddingStack')} className='flex-row justify-between items-center py-4 border-b border-gray-100'>
            <View className='flex-row items-center'>
              <HeroSolid.ClipboardDocumentListIcon size={30} color={'#6b7280'} />
              <Text className='pl-3 font-sfregular text-f15'>Đơn hàng cần xử ý</Text>
            </View>
            <View className='flex-row flex-wrap items-center'>
                <Text className='text-f12'>219</Text>
                <Text className='ml-2'>
                    <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OrderCancelledStack')} className='flex-row justify-between items-center py-4 border-b border-gray-100'>
            <View className='flex-row items-center'>
              <HeroSolid.ClipboardDocumentCheckIcon size={30} color={'#6b7280'} />
              <Text className='pl-3 font-sfregular text-f15'>Đơn hàng huỷ</Text>
            </View>
            <View className='flex-row flex-wrap items-center'>
                <Text className='text-f12'>0</Text>
                <Text className='ml-2'>
                    <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('OrderListReturnStack')} className='flex-row justify-between items-center py-4 border-b border-gray-100'>
            <View className='flex-row items-center'>
              <HeroSolid.ReceiptRefundIcon size={30} color={'#6b7280'} />
              <Text className='pl-3 font-sfregular text-f16'>Phiếu trả hàng</Text>
            </View>
            <View className='flex-row flex-wrap items-center'>
                <Text className='text-f12'>50</Text>
                <Text className='ml-2'>
                    <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

export default OrderOverviewStack;
