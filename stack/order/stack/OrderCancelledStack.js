import { ScrollView, Text, View } from 'react-native';
import OrderItem from '../../../components/order/OrderItem';

const OrderCancelledStack = ({ navigation }) => {
  return (
    <ScrollView className='px-4'>
      <View className='mt-6'>
        <Text className='text-gray-500 text-f14'>2.207 đơn hàng</Text>
        <View className='mt-4'>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderCancelledStack;
