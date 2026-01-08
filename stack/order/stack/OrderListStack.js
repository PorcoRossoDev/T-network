import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import OrderItem from '../../../components/order/OrderItem';
import OrderItemFull from '../../../components/order/OrderItemFull';



const OrderListStack = ({ navigation }) => {
  const route = useRoute();
  const layout = route.params?.layoutOrder ?? false
  return (
    <ScrollView>
      <View className='px-4 bg-white'>
        <View className='mt-6'>
          <Text className='text-gray-500 text-f15 font-sfregular'>2.207 đơn hàng</Text>
          <View className='mt-4'>
            {
              layout ?
              <>
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
              </>
              :
              <>
                <OrderItemFull />
                <OrderItemFull />
                <OrderItemFull />
                <OrderItemFull />
                <OrderItemFull />
                <OrderItemFull />
                <OrderItemFull />
                <OrderItemFull />
              </>
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderListStack;
