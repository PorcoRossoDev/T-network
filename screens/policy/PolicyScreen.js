import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderPolicy from "../../components/policy/HeaderPolicy";
import { PolicyJobListStack, PolicyListStack } from "./stack";

const Stack = createNativeStackNavigator();
const PolicyScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="PolicyJobListStack"
        component={PolicyJobListStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderPolicy
              title={"Danh sách chính sách giá công việc"}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PolicyListStack"
        component={PolicyListStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderPolicy
              title={"Danh sách chính sách giá"}
              navigation={navigation}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default PolicyScreen;
