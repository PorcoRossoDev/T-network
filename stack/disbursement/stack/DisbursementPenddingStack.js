import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import DisbursementItem from '../../../components/disbursement/DisbursementItem';
import DisbursementItemFull from '../../../components/disbursement/DisbursementItemFull';

const DisbursementPenddingStack = () => {
    const route = useRoute();
    const layoutDisbursement = route.params?.layoutDisbursement ?? false
    console.log(layoutDisbursement)
    return (
        <ScrollView className='px-4 bg-white'>
            <View className='mt-6'>
                <Text className='text-gray-500 font-sfregular text-f15'>2.207 phiếu chi</Text>
                <View className='mt-4'>
                    {
                        !layoutDisbursement ?
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

export default DisbursementPenddingStack