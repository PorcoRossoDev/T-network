import { Text, View } from 'react-native';

const CustomerItemDue = () => {
    return (
        <View className='mb-4 pb-4 border-b border-gray-200 flex-row justify-between'>
            <View className='flex-col justify-between gap-y-1'>
                <Text className='font-sfbold text-f17'>Nguyễn Liên</Text>
                <Text className='font-sfregular font-medium text-gray-500 text-f14'>Boy Boy</Text>
                <Text className='font-sfregular font-medium text-blue-600 text-f14'>0989098987</Text>
            </View>
            <View className='flex-col justify-between items-center my-1'>
                <View className='justify-center flex-col items-center'>
                    <Text className='mt-1 text-f13 text-red-600 font-sfregular'>00:00 31/08/2025</Text>
                    <Text className='font-sfregular text-red-600 bg-red-50 border border-red-200 mt-1 px-2 py-1 text-f13'>Quá hạn 25 ngày</Text>
                </View>
            </View>
            <View className='flex-col items-end gap-y-1'>
                <Text className='text-f13 font-sfregular'>29/09/2025 10:16</Text>
                <Text className='bg-red-600 text-white px-3 py-1 rounded-lg mt-1 font-sfregular'>Liên hệ</Text>
            </View>
        </View>
    )
}

export default CustomerItemDue
