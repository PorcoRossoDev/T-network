import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import OrderItemPendding from '../../../components/order/OrderItemPendding';
import OrderItemPenddingFull from '../../../components/order/OrderItemPenddingFull';

const OrderPenddingStack = () => {
    const route = useRoute();
    const layout = route.params?.layoutOrderPendding ?? false
    return (
        <ScrollView className='px-4 bg-white'>
            <View className='mt-6'>
                <Text className='text-gray-500 font-sfregular text-f15'>2.207 đơn hàng</Text>
                <View className='mt-4'>
                    {
                        !layout ?
                        <>
                            <OrderItemPendding />
                            <OrderItemPendding />
                            <OrderItemPendding />
                            <OrderItemPendding />
                            <OrderItemPendding />
                            <OrderItemPendding />
                            <OrderItemPendding />
                            <OrderItemPendding />
                            <OrderItemPendding />
                        </>
                        :
                        <>
                            <OrderItemPenddingFull />
                            <OrderItemPenddingFull />
                            <OrderItemPenddingFull />
                            <OrderItemPenddingFull />
                            <OrderItemPenddingFull />
                            <OrderItemPenddingFull />
                            <OrderItemPenddingFull />
                        </>
                    }
                    
                </View>
            </View>
        </ScrollView>
    )
}

export default OrderPenddingStack