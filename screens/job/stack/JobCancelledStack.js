import { ScrollView, Text, View } from 'react-native';
import JobItem from '../../../components/job/JobItem';

const JobCancelledStack = ({ navigation }) => {
  return (
    <ScrollView className='px-4 bg-white'>
      <View className='mt-6'>
        <Text className='text-gray-500 text-f14'>2.207 đơn hàng</Text>
        <View className='mt-4'>
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
        </View>
      </View>
    </ScrollView>
  );
};

export default JobCancelledStack;
