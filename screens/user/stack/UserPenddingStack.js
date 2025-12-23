import { ScrollView, Text, View } from "react-native";
import UserItemPendding from "../../../components/user/UserItemPendding";

const UserPenddingStack = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 bg-white flex-1 relative">
        <View className="mt-6">
          <Text className="text-gray-500 text-f15 font-sfregular">
            2.207 khách hàng
          </Text>
          <View className="mt-4">
            <UserItemPendding />
            <UserItemPendding />
            <UserItemPendding />
            <UserItemPendding />
            <UserItemPendding />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserPenddingStack;
