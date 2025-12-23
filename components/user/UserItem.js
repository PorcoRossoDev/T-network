import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

const UserItem = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('User', {screen: 'UserDetail'})}
        className='mb-4 pb-4 border-b border-gray-200'>
            <View className='flex-row justify-between items-center'>
                <Text className='font-sfbold text-f16'>Huy Huân</Text>
                <Text className='font-sfmedium bg-green-200 text-green-900 px-2 py-1 text-f14 rounded-lg'>Đang làm việc</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className='text-gray-500'>Boy Boy</Text>
                <Text className='font-sfregular mt-1 text-f14 text-gray-500'>Kỹ thuật HN</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className=' text-gray-500'>huancenthomes@gmail.com</Text>
                <Text className='font-sfregular text-f14 mt-1 text-gray-500'>2025-09-18 11:37:54</Text>
            </View>
        </TouchableOpacity>
    )
}

export default UserItem
