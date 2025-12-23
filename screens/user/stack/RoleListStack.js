import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import RoleItem from "../../../components/user/RoleItem";

const RoleListStack = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 bg-white flex-1 relative">
        <View className="mt-6">
          <Text className="text-gray-500 text-f14">2.207 khách hàng</Text>
          <View className="mt-4">
            <RoleItem />
            <RoleItem />
            <RoleItem />
            <RoleItem />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("User", { screen: "RoleDetailStack" })
        }
        className="absolute bottom-4 right-4 w-16 h-16 bg-blue-600 justify-center items-center rounded-full border-2 border-gray-400"
      >
        <HeroOutline.PlusIcon size={25} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export default RoleListStack;
