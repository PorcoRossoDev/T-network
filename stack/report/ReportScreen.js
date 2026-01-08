import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import * as HeroSolid from "react-native-heroicons/solid";
import { ReportCustomerStack, ReportOrderStack, ReportOverviewStack } from './stack';

const Stack = createNativeStackNavigator();
const ReportScreen = () => {
  const navigation = useNavigation();
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
    >
      <Stack.Screen
        name="ReportOverviewStack"
        component={ReportOverviewStack}
        options={{
          headerShown: false,   // ⬅ ẨN CHÍNH TẠI ĐÂY
        }}
      />
      <Stack.Screen
        name="ReportCustomerStack"
        component={ReportCustomerStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Công việc'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ReportOrderStack"
        component={ReportOrderStack}
        options={ ({navigation}) => ({ 
          title: 'Đơn hàng', 
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="">
              <HeroOutline.ChevronLeftIcon size={22} color="#000" />
            </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default ReportScreen;
