import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const SalesSourceItem = ({openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View className='flex-row justify-between mb-5 pb-5 ptext-f16  border-b items-start border-gray-200'>
            <View className='items-center justify-items-start bg-gray-100 flex-row'>
                <Text className='font-sfmedium text-f15 text-left'>Khác</Text>
            </View>
            <View className='bg-[#0089FF] rounded-lg justify-center items-center px-2 py-1 font-sfregular'>
                <Text className='text-white'>#0089FF</Text>
            </View>
            <View className=''>
                <View className='flex-row flex-wrap gap-x-1.5'>
                    <TouchableOpacity onPress={openModal} className='border rounded-md p-1'>
                        <HeroOutline.PencilIcon size={15} color={'#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity className='border border-red-600 rounded-md p-1'>
                        <HeroOutline.TrashIcon size={15} color={'#dc2626'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SalesSourceItem
