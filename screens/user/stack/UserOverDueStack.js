import { ScrollView, Text, View } from "react-native";
import UserItemDue from "../../../components/user/UserItemDue";

const UserOverDueStack = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 bg-white flex-1 relative">
        <View className="mt-6">
          <Text className="text-gray-500 text-f15 font-sfregular">
            2.207 khách hàng
          </Text>
          <View className="mt-4">
            <UserItemDue />
            <UserItemDue />
            <UserItemDue />
            <UserItemDue />
            <UserItemDue />
            <UserItemDue />
            <UserItemDue />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserOverDueStack;
