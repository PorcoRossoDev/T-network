import { Image, Text, View } from 'react-native';

const JobItemOrder = ({ props }) => {
    const zaloIcon = require('../../assets/images/Icon_Zalo.png')
    return (
        <View className='mb-4 pb-4 border-b border-gray-200 flex-row flex-wrap justify-between'>
            <View className='w-[40%]'>
                <Text className='font-sfbold text-f17'>230925-128</Text>
                <Text className='font-sfregular text-gray-500 text-f14 my-1'>Chị Trang</Text>
                <Text className='font-sfregular text-gray-500 text-f14'>15:18 23/09/2025</Text>
            </View>
            <View className='w-[20%]'>
                <View className='flex-col justify-center items-center'>
                    <Image
                        source={zaloIcon}
                        style={{ width: 40, height: 40}}
                        resizeMode="cover"
                        />
                    <Text className='font-sfregular text-green-500 mt-1.5'>Đã giao hàng</Text>
                </View>
            </View>
            <View className='flex-row flex-1 gap-x-3 justify-end items-center'>
                <View className='flex-col items-end gap-y-1 '>
                    <Text className='text-f15 font-sfbold'>230.709 đ</Text>
                    <Text className='text-gray-500 text-f13 font-sfregular'>Tuấn Anh</Text>
                    <View className='flex-row items-center gap-x-1 justify-between'>
                        <Text className='font-sfregular'>VAT</Text>
                        <View className='w-2.5 h-2.5 bg-green-500 border border-green-500 rounded-full' />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default JobItemOrder
