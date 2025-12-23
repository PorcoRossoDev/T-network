import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from 'react-native';

const JobItem = ({openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetailStack')}>
             <View className='mb-5 pb-5 border-b border-gray-200'>
                <Text className='font-sfmedium text-f16'>Bảo hành / bảo dưỡng tận nơi - <Text>50.000 đ</Text></Text>
                <View className='flex-row justify-between items-center'>
                    <Text className='font-sfregular text-f16'>Ngọc Linh</Text>
                    <Text className={`font-sfregular text-f12 border border-orange-300 bg-orange-100 px-1.5 py-1 rounded-md text-orange-400`} style={{includeFontPadding: false,}}>Tạo công việc</Text>
                </View>
                <View className='flex-row justify-between mt-1'>
                    <Text className='font-sfregular text-f14'>01:30 06/10/2025</Text>
                    <Text className='font-sfregular text-f14'>Huy Huân</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default JobItem
