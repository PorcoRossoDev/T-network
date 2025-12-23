import { useNavigation } from "@react-navigation/native";
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";

const OrderNavigation = () => {
    const navigation = useNavigation();
    const boxShadow = {
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: Platform.OS == 'ios' ?  10 : 6,
        // Shadow cho iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        // Shadow cho Android
        elevation: 5,
    }
    return (
        <View className='mt-4'>
            <Text className='uppercase font-medium text-f15 font-sfregular-bold'>Danh sách đơn hàng</Text>
            <View className='mt-3 pt-2'>
                <TouchableOpacity 
                    onPress={() =>
                        navigation.navigate('Order', {
                        screen: 'OrderListStack',
                        })
                    }
                    style={boxShadow}
                    className='mb-4 p-2 flex-row flex-wrap justify-between w-full items-center border-b border-gray-200'
                    >
                    <View className='flex-row flex-wrap items-center justify-center' >
                        <View className='rounded-xl w-11 h-11 justify-center items-center'>
                            <HeroSolid.ShoppingCartIcon size={25} color={'#60a5fa'} />
                        </View>
                        <View className='pl-2'>
                            <Text className='font-sfregular text-f16'>Tổng đơn hàng</Text>
                            <Text className='text-blue-600 text-f14 mt-1'>586.727.343</Text>
                        </View>
                    </View>
                    <View className='flex-row flex-wrap items-center'>
                        <Text className='text-blue-600 bg-blue-100 rounded-2xl px-3 py-2 text-f12'>117</Text>
                        <Text className='ml-2'>
                            <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() =>
                        navigation.navigate('Order', {
                        screen: 'OrderSuccessStack',
                        })
                    }
                    style={boxShadow}
                    className='mb-4 p-2 flex-row flex-wrap justify-between w-full items-center border-b border-gray-200'
                    >
                    <View className='flex-row flex-wrap'>
                        <View className=' rounded-xl w-12 h-12 justify-center items-center'>
                            <HeroSolid.CheckCircleIcon size={25} color={'#4ade80'} />
                        </View>
                        <View className='pl-2'>
                            <Text className='font-sfregular text-f16'>Hoàn thành</Text>
                            <Text className='text-green-600 text-f14 mt-1'>586.727.343</Text>
                        </View>
                    </View>
                    <View className='flex-row flex-wrap items-center'>
                        <Text className='text-green-600 bg-green-100 rounded-2xl px-3 py-2 text-f12'>90</Text>
                        <Text className='ml-2'>
                            <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() =>
                        navigation.navigate('Order', {
                        screen: 'OrderPaymentSuccessStack',
                        })
                    }
                    style={boxShadow}
                    className='mb-4 p-2 flex-row flex-wrap justify-between w-full items-center border-b border-gray-200'
                    >
                    <View className='flex-row flex-wrap'>
                        <View className=' rounded-xl w-12 h-12 justify-center items-center'>
                            <HeroSolid.CreditCardIcon size={25} color={'#c084fc'} />
                        </View>
                        <View className='pl-2'>
                            <Text className='font-sfregular text-f16'>Đã Thanh toán</Text>
                            <Text className='text-purple-600 text-f14 mt-1'>586.727.343</Text>
                        </View>
                    </View>
                    <View className='flex-row flex-wrap items-center'>
                        <Text className='text-purple-600 bg-purple-100 rounded-2xl px-3 py-2 text-f12'>88</Text>
                        <Text className='ml-2'>
                            <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() =>
                        navigation.navigate('Order', {
                        screen: 'UnpaidOrdersStack',
                        })
                    }
                    style={boxShadow}
                    className='mb-4 p-2 flex-row flex-wrap justify-between w-full items-center border-b border-gray-200'
                    >
                    <View className='flex-row flex-wrap'>
                        <View className=' rounded-xl w-12 h-12 justify-center items-center'>
                            <HeroSolid.ClockIcon size={25} color={'#fb923c'} />
                        </View>
                        <View className='pl-2'>
                            <Text className='font-sfregular text-f16'>Chưa Thanh toán</Text>
                            <Text className='text-orange-600 text-f14 mt-1'>586.727.343</Text>
                        </View>
                    </View>
                    <View className='flex-row flex-wrap items-center'>
                        <Text className=' bg-orange-100 rounded-2xl px-3 py-2 text-f12'>21</Text>
                        <Text className='ml-2'>
                            <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={boxShadow}
                    className='mb-4 p-2 flex-row flex-wrap justify-between w-full items-center border-b border-gray-200'>
                    <View className='flex-row flex-wrap'>
                        <View className=' rounded-xl w-12 h-12 justify-center items-center'>
                            <HeroSolid.TruckIcon size={25} color={'#f472b6'} />
                        </View>
                        <View className='pl-2'>
                            <Text className='font-sfregular text-f16'>Hẹn giao</Text>
                            <Text className='text-pink-600 text-f14 mt-1'>0</Text>
                        </View>
                    </View>
                    <View className='flex-row flex-wrap items-center'>
                        <Text className='text-pink-600 bg-pink-100 rounded-2xl px-3 py-2 text-f12'>17</Text>
                        <Text className='ml-2'>
                            <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={boxShadow} 
                    className='pb-2 flex-row flex-wrap justify-between w-full items-center border-b border-gray-200'>
                    <View className='flex-row flex-wrap'>
                        <View className=' rounded-xl w-12 h-12 justify-center items-center'>
                            <HeroSolid.ArrowDownTrayIcon size={25} color={'#f87171'} />
                        </View>
                        <View className='pl-2'>
                            <Text className='font-sfregular text-f16'>Công nợ</Text>
                            <Text className='text-red-600 text-f14 mt-1'>225.435.678</Text>
                        </View>
                    </View>
                    <View className='flex-row flex-wrap items-center'>
                        <Text className='text-red-600 bg-red-100 rounded-2xl px-3 py-2 text-f12'>0</Text>
                        <Text className='ml-2'>
                            <HeroSolid.ChevronRightIcon size={17} color={'#9ca3af'} />
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderNavigation