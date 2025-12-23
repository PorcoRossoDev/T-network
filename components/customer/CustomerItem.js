import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomerItem = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('CustomerDetailStack')} className='mb-4 pb-4 border-b border-gray-200'>
            <View className='flex-row justify-between'>
                <Text className='font-sfmedium text-f17'>Nguyễn Liên</Text>
                <Text className='font-sfmedium font-bold text-f16'>1</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className='text-gray-400'>Boy Boy</Text>
                <Text className='font-sfmedium font-bold text-f15 text-red-500'>386.217</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className=' text-blue-500'>0988789877</Text>
                <Text className='font-sfmedium font-bold text-f15 text-blue-600'>399.000</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomerItem
