import { useNavigation } from '@react-navigation/native';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

const OrderItem = ({ props }) => {
    const zaloIcon = require('../../assets/images/Icon_Zalo.png')
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('OrderDetailStack')} className='mb-4 pb-4 border-b border-gray-200 flex-row flex-wrap justify-between'>
            <View className='w-[40%]'>
                <Text className={`font-sfbold text-f17 ${Platform.OS=='android'?'leading-6':'leading-7'}`}>230925-128</Text>
                <Text className={`font-sfregular text-gray-500 text-f14 ${Platform.OS=='android'?'leading-7':'leading-7'}`}>Chị Trang</Text>
                <Text className={`font-sfregular text-gray-500 text-f14 ${Platform.OS=='android'?'leading-6':'leading-7'}`}>15:18 23/09/2025</Text>
            </View>
            <View className='w-[20%]'>
                <Image
                    source={zaloIcon}
                    style={{ width: 50, height: 50}}
                    resizeMode="cover"
                    />
            </View>
            <View className='flex-row flex-1 gap-x-3 justify-end items-center'>
                <View className={`flex-col items-end ${Platform.OS=='android'?'':'gap-y-1'}`}>
                    <Text className={`text-f15 font-sfbold ${Platform.OS=='android'?'leading-6':'leading-7'}`}>230.709 đ</Text>
                    <Text className={`font-sfregular text-green-500 ${Platform.OS=='android'?'leading-7':'leading-5'}`}>Đã giao hàng</Text>
                    <Text className={`text-gray-500 text-f13 font-sfregular ${Platform.OS=='android'?'leading-7':'leading-5'}`}>Tuấn Anh</Text>
                </View>
                <View>
                    <View className='flex-row items-center gap-x-1 justify-between'>
                        <Text className='font-sfregular'>TT</Text>
                        <View className='w-2.5 h-2.5 bg-white border rounded-full' />
                    </View>
                    <View className='flex-row items-center gap-x-1 justify-between'>
                        <Text className='font-sfregular'>VAT</Text>
                        <View className='w-2.5 h-2.5 bg-red-500 border border-red-500 rounded-full' />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem