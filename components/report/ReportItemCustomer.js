import { useState } from 'react';
import { Text, View } from 'react-native';

const ReportItemCustomer = ({openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View>
             <View className='mb-5 pb-5 border-b flex-row justify-between items-start border-gray-200'>
                <View className='flex-col justify-between w-[70%]'>
                    <Text className='font-sfmedium text-f16'>Giao đơn #221025-118 107A Bùi Thị Xuân, Phường Hai Bà Trưng, HN</Text>
                    <View className='flex-row items-center' style={{includeFontPadding: false,}}>
                        <Text className='text-gray-700 font-sfregular text-f15 mt-1'>Hoàn thành</Text>
                    </View>
                </View>
                <View className='flex-col justify-end items-end flex-1'>
                    <Text className='font-sfmedium text-green-700 text-f15'>1.399.000 đ</Text>
                    <Text className='mt-2 flex-row flex-wrap gap-x-1.5'>
                        13:40 24/10/2025
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ReportItemCustomer
