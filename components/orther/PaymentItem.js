import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const PaymentItem = ({openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View>
             <View className='mb-5 pb-5 border-b flex-row justify-between items-center border-gray-200'>
                <View className='justify-between items-center'>
                    <Text className='font-sfbold text-f16'>Công nợ</Text>  
                </View>
                <View className='flex-col justify-end items-end'>
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

export default PaymentItem
