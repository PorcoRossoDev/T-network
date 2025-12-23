import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import DisbursementItem from '../../../components/disbursement/DisbursementItem';
import DisbursementItemFull from '../../../components/disbursement/DisbursementItemFull';

const DisbursemenCanclledStack = ({ navigation }) => {
  const route = useRoute();
  const layoutCanclled = route.params?.layoutCanclled ?? false
  return (
    <ScrollView className='px-4'>
      <View className='mt-6'>
        <Text className='text-gray-500 text-f14'>2.207 phiếu chi</Text>
        <View className='mt-4'>
          {
            !layoutCanclled ?
            <>
              <DisbursementItem />
              <DisbursementItem />
              <DisbursementItem />
              <DisbursementItem />
              <DisbursementItem />
              <DisbursementItem />
              <DisbursementItem />
            </>
            :
            <>
            <DisbursementItemFull />
            <DisbursementItemFull />
            <DisbursementItemFull />
            <DisbursementItemFull />
            <DisbursementItemFull />
            <DisbursementItemFull />
            <DisbursementItemFull />
            </>
          }
          
        </View>
      </View>
    </ScrollView>
  );
};

export default DisbursemenCanclledStack;
