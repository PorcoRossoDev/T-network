import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import {
  ForgotScreen,
  LoginScreen
} from "./stack";

const Stack = createNativeStackNavigator();
const UserStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false, // ✅ QUAN TRỌNG
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={{
          headerShown: false, // ✅ QUAN TRỌNG
        }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
