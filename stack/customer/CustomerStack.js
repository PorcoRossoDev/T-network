import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import { CustomerOverviewScreen, CustomerIntroduceScreen, CustomerEditScreen, CustomerInfoScreen, CustomerManageScreen, CustomerResetPinScreen } from './screen';

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
    }}
    >
      <Stack.Screen
        name="CustomerOverview"
        component={CustomerOverviewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerIntroduce"
        component={CustomerIntroduceScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerEdit"
        component={CustomerEditScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerInfo"
        component={CustomerInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerManage"
        component={CustomerManageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerResetPin"
        component={CustomerResetPinScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CustomerStack;
