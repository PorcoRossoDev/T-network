import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import { CustomerOverviewStack, CustomerIntroduceStack } from './stack';

const Stack = createNativeStackNavigator();

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
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerIntroduceStack"
        component={CustomerIntroduceStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Customer;
