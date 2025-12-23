import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import DisbursementItem from '../../../components/disbursement/DisbursementItem';
import DisbursementItemFull from '../../../components/disbursement/DisbursementItemFull';

const DisbursementListStack = () => {
    const route = useRoute();
    const layoutList = route.params?.layoutList ?? false
    return (
        <ScrollView className='px-4 bg-white'>
            <View className='mt-6'>
                <Text className='text-gray-500 font-sfregular text-f15'>2.207 phiếu chi</Text>
                <View className='mt-4'>
                    {
                        !layoutList ?
                        <>
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
                        </>
                    }
                    
                </View>
            </View>
        </ScrollView>
    )
}

export default DisbursementListStack