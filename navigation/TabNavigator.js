import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import {
  CubeIcon,
  HomeIcon,
  ListBulletIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "react-native-heroicons/outline";
import {
  CustomerStack,
  HomeScreen,
  UserStack,
} from "../stack";

const Tab = createBottomTabNavigator();

// Mảng cấu hình tab để dễ mở rộng
const tabs = [
  {
    name: "Home",
    component: HomeScreen,
    icon: HomeIcon,
    hidden: false,
    label: "Tổng quan",
  },
  {
    name: "Customer",
    component: CustomerStack,
    icon: UserGroupIcon,
    hidden: false,
    label: "Khách hàng",
  },
  {
    name: "User",
    component: UserStack,
    icon: UserGroupIcon,
    hidden: false,
    label: "Nhân viên",
  },
];

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        }
      }}
    >
      {tabs.map(({ name, component, icon: Icon, hidden, label }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon color={focused ? "#D70404" : color} size={21} />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AppNavigation;
