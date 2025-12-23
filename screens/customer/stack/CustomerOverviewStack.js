import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";
import CustomerLineChart from '../../../components/customer/CustomerLineChart';
import CustomerNavigation from '../../../components/customer/CustomerNavigation';

const CustomerOverviewStack = ({ navigation }) => {

  const goOrderCancelled = () => {
    navigation.navigate('OrderCancelledStack')
  }

  return (
    <ScrollView>
      <View className=' bg-gray-100'>

        {/* Tạo đơn hàng */}
        <View className='justify-center items-center'>
          <View className='w-[85%] py-10 mt-10 justify-center items-center bg-white rounded-t-2xl'>
            <TouchableOpacity onPress={() => navigation.navigate('CustomerAddStack')} className='justify-center text-center'>
              <View className='justify-center items-center'>
                <View className='w-[50px] h-[50px] justify-center items-center bg-blue-600 rounded-full'>
                  <HeroSolid.PlusIcon size={25} color={'white'} />
                </View>
              </View>
              <Text className='text-f16 mt-4 font-sfmedium'>Tạo khách hàng</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className=''>

          {/* Biểu đồ */}
          <View className='bg-white'>
            <View className='pt-8 mb-7 px-4'>
              <CustomerLineChart />
            </View>
          </View>
        
          {/* Danh sách đơn hàng */}
          <View className='mt-4'>
            <CustomerNavigation/>
          </View>
        </View>

        {/* Đơn hàng */}
        <View className='bg-white mt-4 flex-1 w-full px-4 mb-6'>
          <TouchableOpacity onPress={() => navigation.navigate('CustomerPenddingStack')} className='flex-row justify-between items-center py-4 border-b border-gray-100'>
            <View className='flex-row items-center'>
              <HeroSolid.UserCircleIcon size={30} color={'#9ca3af'} />
              <Text className='pl-3 font-sfregular text-f15'>Khách hàng cần xử lý</Text>
            </View>
            <View className='flex-row flex-wrap items-center'>
                <Text className='text-f12 font-sfregular '>219</Text>
                <Text className='ml-2'>
                    <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CustomerOverDueStack')} className='flex-row justify-between items-center py-4 border-b border-gray-100'>
            <View className='flex-row items-center'>
              <HeroSolid.UserCircleIcon size={30} color={'#9ca3af'} />
              <Text className='pl-3 font-sfregular text-f15'>Khách hàng quá hạn</Text>
            </View>
            <View className='flex-row flex-wrap items-center'>
                <Text className='text-f12'>0</Text>
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

export default CustomerOverviewStack;
