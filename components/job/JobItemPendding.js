import { useState } from 'react';
import { Text, View } from 'react-native';

const JobItemPedding = ({openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View className='mb-5 pb-5 border-b border-gray-200'>
            <Text className='font-sfmedium text-f16'>Bảo hành / bảo dưỡng tận nơi - <Text className='text-green-800'>50.000 đ</Text></Text>
            <View className='flex-row justify-between items-center'>
                <View className='w-1/3'>
                    <Text className='font-sfregular text-f15'>Ngọc Linh</Text>
                </View>
                <View className='w-1/3'>
                    <Text className='mt-1 text-f13 text-red-600 text-center font-sfregular'>00:00 31/08/2025</Text>
                </View>
                <View className='mt-1 w-1/3'>
                    <View className='flex-row justify-end'>
                        <Text className={`font-sfregular text-f12 border border-orange-300 bg-orange-100 px-1.5 py-1 rounded-md text-orange-400`} style={{includeFontPadding: false,}}>Tạo công việc</Text>
                    </View>
                </View>
            </View>
            <View className='flex-row justify-between items-center'>
                <View className='w-1/3'>
                    <Text className='font-sfregular text-f14'>15:18 23/09/2025</Text>
                </View>
                <View className='w-1/3 flex-row justify-center'>
                    <Text className='font-sfregular text-red-600 bg-red-50 border border-red-200 mt-1 px-2 text-f13'>Quá hạn 25 ngày</Text>
                </View>
                <View className='mt-1 w-1/3'>
                    <View className='flex-row justify-end'>
                        <Text className='font-sfregular text-f14'>Huy Huân</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default JobItemPedding
