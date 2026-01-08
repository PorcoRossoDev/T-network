import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import JobItem from '../../../components/job/JobItem';



const JobListStack = ({ navigation }) => {
  const route = useRoute();
  const layout = route.params?.layoutOrder ?? false
  return (
    <ScrollView>
      <View className='px-4 bg-white'>
        <View className='mt-6'>
          <Text className='text-gray-500 text-f15 font-sfregular'>2.207 đơn hàng</Text>
          <View className='mt-4'>
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default JobListStack;
