import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

const RoleItem = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('User', {screen: 'UserDetail'})}
        className='mb-4 pb-4 border-b border-gray-200'>
            <View className='flex-row justify-between items-center'>
                <Text className='font-sfbold text-f16'>TMĐT</Text>
                <Text className='font-sfregular text-f14 text-gray-500'>25-09-18 13:57:45</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className=''>Đang làm việc: 1</Text>
                <Text className='font-sfregular mt-1 text-f14'>Đã nghỉ việc: 0</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RoleItem
