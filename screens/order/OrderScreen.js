import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";
import HeaderOrder from '../../components/order/HeaderOrder';

import { OrderAddStack, OrderDetailStack, OrderFilterStack, OrderListReturnStack, OrderListStack, OrderOverviewStack, OrderPenddingStack, OrderReturnDetailStack } from './stack';
const Stack = createNativeStackNavigator();
const OrderScreen = () => {
  const navigation = useNavigation();
  const [layoutOrderPendding, setlayoutOrderPendding] = useState(false)
  const [layoutOrder, setlayoutOrder] = useState(false)

  const HeaderBar = ({ title, navigation }) => {
    return (
      <View
        className="bg-white"
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
          paddingVertical: 12,
        }}
      >
        {/* Icon Back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute left-5 bottom-3 z-50'
        >
          <HeroSolid.ArrowLeftIcon size={22} />
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      </View>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="OrderOverviewStack"
        component={OrderOverviewStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Đơn hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderDetailStack"
        component={OrderDetailStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Chi tiết đơn hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderReturnDetailStack"
        component={OrderReturnDetailStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Chi tiết trả hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderListStack"
        component={OrderListStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder
            title={'Danh sách đơn hàng'}
            layoutOrder={route.params?.layoutOrder ?? false}
            onToggleLayout={() => {
              const current = route.params?.layoutOrder ?? false
              navigation.setParams({ layoutOrder: !current })
            }}
            navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderCancelledStack"
        component={OrderListStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder title={'Đơn hàng huỷ'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderSuccessStack"
        component={OrderListStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder title={'Đơn hàng hoàn thành'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderPaymentSuccessStack"
        component={OrderListStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder title={'Đã thanh toán'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="UnpaidOrdersStack"
        component={OrderListStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder title={'Chưa thanh toán'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderPenddingStack"
        component={OrderPenddingStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder
            title={'Đơn hàng cần xử lý'}
            layoutOrderPendding={route.params?.layoutOrderPendding ?? false}
            onToggleLayout={() => {
              const current = route.params?.layoutOrderPendding ?? false
              navigation.setParams({ layoutOrderPendding: !current })
            }}
            navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderFilterStack"
        component={OrderFilterStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder title={'Bộ lọc'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderAddStack"
        component={OrderAddStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Tạo đơn hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="OrderListReturnStack"
        component={OrderListReturnStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderOrder title={'Danh sách trả hàng'} navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default OrderScreen;
