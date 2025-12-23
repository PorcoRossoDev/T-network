import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderSalesSource from "../../components/salesSource/HeaderSalesSource";
import { SalesSourceListStack } from "./stack";

const Stack = createNativeStackNavigator();
const SalesSourceScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      {/* <Stack.Screen
        name="UserOverviewStack"
        component={UserOverviewStack}
        options={{ title: 'Khách hàng', headerBackVisible: false, navigation:navigation }}
      /> */}
      <Stack.Screen
        name="SalesSourceListStack"
        component={SalesSourceListStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderSalesSource
              title={"Danh sách nguồn"}
              navigation={navigation}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default SalesSourceScreen;
