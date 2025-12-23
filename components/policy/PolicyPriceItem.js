import { useState } from 'react';
import { Platform, Switch, Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const PolicyPriceItem = ({openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View>
             <View className='mb-5 pb-5 border-b flex-row justify-between items-start border-gray-200'>
                <View className='flex-col justify-between'>
                    <Text className='font-sfbold text-f16'>Kinh doanh/TMĐT/Free</Text>
                    <View className='flex-row items-center' style={{includeFontPadding: false,}}>
                        <Text className='text-gray-700 font-sfregular text-f15'>Upload hình ảnh</Text>
                        <View style={{includeFontPadding: false,}}>
                            <Switch
                                trackColor={{ false: '#d1d5db', true: '#2563eb' }}
                                thumbColor="#fff"
                                value={isEnabled}
                                onValueChange={toggleSwitch}
                                style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.7 : 0.9 }],includeFontPadding: false }}
                                android_ripple={{ color: 'transparent' }} // tránh hiệu ứng ripple che màu
                            />
                        </View>
                    </View>
                </View>
                <View className='flex-col justify-end items-end'>
                    <Text className='font-sfbold font-medium text-f15'>1.399.000 đ</Text>
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

export default PolicyPriceItem
