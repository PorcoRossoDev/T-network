import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import HeaderLog from "../../components/orther/HeaderLog";
import {
  ActivityStack,
  CareScheduleListStack,
  LogStack,
  OrtherSettingStack,
  PaymentStack,
  SettingStoreStack,
  TagStack,
  TypeDetailStack,
  TypeStack,
} from "./stack";

const Stack = createNativeStackNavigator();
const OrtherScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="OrtherSettingStack"
        component={OrtherSettingStack}
        options={{ title: "Cài đặt", headerBackVisible: false }}
      />
      <Stack.Screen
        name="ActivityStack"
        component={ActivityStack}
        options={{ title: "", headerBackVisible: false }}
      />
      <Stack.Screen
        name="SettingStoreStack"
        component={SettingStoreStack}
        options={({ navigation }) => ({
          title: "Thông tin cửa hàng",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.ArrowLeftIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.CheckIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TagStack"
        component={TagStack}
        options={({ navigation }) => ({
          title: "Danh sách Hashtag",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.ArrowLeftIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.CheckIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PaymentStack"
        component={PaymentStack}
        options={({ navigation }) => ({
          title: "Hình thức thanh toán",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.ArrowLeftIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.PlusIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CareScheduleListStack"
        component={CareScheduleListStack}
        options={({ navigation }) => ({
          title: "Danh sách lịch chăm sóc",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.XMarkIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.PlusIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TypeStack"
        component={TypeStack}
        options={({ navigation }) => ({
          title: "Danh sách phân loại",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.XMarkIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.PlusIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TypeDetailStack"
        component={TypeDetailStack}
        options={({ navigation }) => ({
          title: "Cập nhật phân loại",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.XMarkIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.PlusIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="LogStack"
        component={LogStack}
        options={({ navigation }) => ({
          header: () => <HeaderLog title="Hoạt động" navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default OrtherScreen;
