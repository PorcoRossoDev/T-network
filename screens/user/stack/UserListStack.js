import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import UserItem from "../../../components/user/UserItem";

const UserListStack = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 bg-white flex-1 relative">
        <View className="mt-6">
          <Text className="text-gray-500 text-f14">2.207 khách hàng</Text>
          <View className="mt-4">
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-4 right-4 w-16 h-16 bg-blue-600 justify-center items-center rounded-full border-2 border-gray-400">
        <HeroOutline.PlusIcon size={25} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export default UserListStack;
