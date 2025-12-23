import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import HeaderUser from "../../components/user/HeaderUser";
import {
  RoleDetailStack,
  RoleListStack,
  UserDetailStack,
  UserListStack,
  UserOverDueStack,
  UserOverviewStack,
  UserPenddingStack,
} from "./stack";

const Stack = createNativeStackNavigator();
const UserScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="UserOverviewStack"
        component={UserOverviewStack}
        options={{
          title: "Khách hàng",
          headerBackVisible: false,
          navigation: navigation,
        }}
      />
      <Stack.Screen
        name="UserListStack"
        component={UserListStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderUser title={"Danh sách nhân viên"} navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="UserAllStack"
        component={UserListStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderUser title={"Tổng khách hàng"} navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="UserNewStack"
        component={UserListStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderUser title={"Khách hàng mới"} navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="UserPenddingStack"
        component={UserPenddingStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderUser
              title={"Khách hàng cần xử lý"}
              navigation={navigation}
            />
          ),
        })}
      />
      <Stack.Screen
        name="UserOverDueStack"
        component={UserOverDueStack}
        options={({ navigation, route }) => ({
          header: () => (
            <HeaderUser title={"Khách hàng quá hạn"} navigation={navigation} />
          ),
        })}
      />
      <Stack.Screen
        name="UserDetailStack"
        component={UserDetailStack}
        options={({ navigation }) => ({
          title: "Cập nhật nhân viên",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.ChevronLeftIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.CheckIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="RoleListStack"
        component={RoleListStack}
        options={({ navigation }) => ({
          title: "Phân quyền vai trò",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.ChevronLeftIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="RoleDetailStack"
        component={RoleDetailStack}
        options={({ navigation }) => ({
          title: "Cập nhật vai trò",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <HeroOutline.ChevronLeftIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserScreen;
