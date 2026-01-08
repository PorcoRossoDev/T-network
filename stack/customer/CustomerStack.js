import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import { CustomerOverviewScreen, CustomerIntroduceScreen, CustomerEditScreen } from './screen';

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
    </Stack.Navigator>
  );
};

export default CustomerStack;
