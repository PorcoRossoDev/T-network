import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const CareScheduleItem = ({openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View>
            <View className='mb-5 pb-5 border-b border-gray-200'>
                <View className='flex-row justify-between items-center'>
                    <Text className='font-sfbold text-f16'>30 ngày</Text>
                    <Text className='font-sfmedium text-f15'>G30</Text>
                </View>
                <View className='flex-row justify-between items-center mt-1'>
                    <Text className='font-sfmedium text-f15'>Gọi sau 01 tháng</Text>
                    <Text className='font-sfmedium text-f15'>Ngày xử lý: 60</Text>
                </View>
                <View className='flex-row justify-between items-center'>
                    <Text className='font-sfmedium text-f15'>Đơn hang: 99</Text>
                    <View className='mt-2 flex-row flex-wrap gap-x-1.5'>
                        <TouchableOpacity onPress={openModal} className='border rounded-md p-1'>
                            <HeroOutline.PencilIcon size={15} color={'#333'} />
                        </TouchableOpacity>
                        <TouchableOpacity className='border border-red-600 rounded-md p-1'>
                            <HeroOutline.TrashIcon size={15} color={'#dc2626'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CareScheduleItem
