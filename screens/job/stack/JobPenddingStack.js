import { ScrollView, Text, View } from "react-native";
import JobItemPedding from "../../../components/job/JobItemPendding";

const JobPenddingStack = ({ navigation }) => {
  const goOrderCancelled = () => {
    navigation.navigate("OrderCancelledStack");
  };
  r;
  return (
    <ScrollView className="bg-white">
      <View className="mt-6 px-4">
        <Text className="text-gray-500 font-sfregular text-f15">
          2.207 công việc
        </Text>
        <View className="mt-4">
          <JobItemPedding />
          <JobItemPedding />
          <JobItemPedding />
          <JobItemPedding />
          <JobItemPedding />
          <JobItemPedding />
        </View>
      </View>
    </ScrollView>
  );
};

export default JobPenddingStack;
