import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import HeaderOrder from '../../components/order/HeaderOrder';
import { CustomerAddStack, CustomerGroupStack, CustomerListStack, CustomerOverDueStack, CustomerOverviewStack, CustomerPenddingStack, CustomerDetailStack } from './stack';

const Stack = createNativeStackNavigator();

const HeaderBar = ({title, navigation}) => {
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
            <HeroOutline.ArrowLeftIcon size={22} color='#000' />
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



const Customer = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
    }}
    >
      <Stack.Screen
        name="CustomerOverviewStack"
        component={CustomerOverviewStack}
        options={({navigation, route}) => ({
          header: () => <HeaderBar title={'Khách hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerAddStack"
        component={CustomerAddStack}
        options={({navigation, route}) => ({
          header: () => <HeaderBar title={'Thêm khách hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerDetailStack"
        component={CustomerDetailStack}
        options={({navigation, route}) => ({
          header: () => <HeaderBar title={'Chi tiết khách hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerListStack"
        component={CustomerListStack}
        options={({navigation, route}) => ({
          header: () => <HeaderOrder title={'Khách hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerAllStack"
        component={CustomerListStack}
        options={({navigation, route}) => ({
          header: () => <HeaderOrder title={'Tổng khách hàng'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerNewStack"
        component={CustomerListStack}
        options={({navigation, route}) => ({
          header: () => <HeaderOrder title={'Khách hàng mới'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerPenddingStack"
        component={CustomerPenddingStack}
        options={({navigation, route}) => ({
          header: () => <HeaderOrder title={'Khách hàng cần xử lý'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerOverDueStack"
        component={CustomerOverDueStack}
        options={({navigation, route}) => ({
          header: () => <HeaderOrder title={'Khách hàng quá hạn'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CustomerGroupStack"
        component={CustomerGroupStack}
        options={ ({navigation}) => ({ 
          title: 'Nhóm khách hàng', 
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductOverviewStack')}
              className="">
              <HeroOutline.XMarkIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductOverviewStack')}
              className="">
              <HeroOutline.CheckIcon size={22} color="#000" />
            </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default Customer;
