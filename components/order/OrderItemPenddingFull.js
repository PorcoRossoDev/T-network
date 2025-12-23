import { Platform, Text, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";


const OrderItemPenddingFull = () => {
    return (
        <View className='bg-white p-4 mb-4'
            style={{
                backgroundColor: "white",
                borderRadius: 10,
                // paddingVertical: 16,
                // Shadow cho iOS
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                // Shadow cho Android
                elevation: 6,
            }}
        >
            <View className="flex-row justify-between items-start">
                {/* Bên trái */}
                <View>
                    <Text className={`text-f19 font-sfbold text-blue-700 ${Platform.OS=='android'?'leading-6':''}`} style={{includeFontPadding: false,}}>240619-122</Text>
                    <Text className="text-f19 font-sfbold" style={{includeFontPadding: false,}}>3.199.200 đ</Text>
                
                    <View className={`flex-row items-center ${Platform.OS=='ios'?'mt-3':'mt-2'}`}>
                        <HeroSolid.CalendarIcon size={19} color={'#CECECE'} />
                        <View className='ml-3'>
                            <Text className='text-f16 font-sfregular'>
                                30 ngày
                            </Text>
                        </View>
                    </View>  
                    <View className={`flex-row items-center ${Platform.OS=='ios'?'mt-3':'mt-1'}`}>
                        <HeroSolid.UserCircleIcon size={19} color={'#CECECE'} />
                        <View className='ml-3'>
                            <Text className='text-f16 font-sfregular'>
                                Anh Việt - {' '}
                                <Text className='font-medium underline ml-6' styles={{paddingLeft: 3}}>098765637</Text>
                            </Text>
                        </View>
                    </View>          
                </View>

                {/* Bên phải */}
                <View className="items-end">
                    <View className="bg-green-500 px-3 py-1 rounded-lg">
                        <Text className="text-white font-sfbold text-f14 font-bold" style={{includeFontPadding: false,}}>Hoàn thành</Text>
                    </View>
                    <Text className={`text-f13 font-sfregular text-right ${Platform.OS=='ios'?'mt-2':'mt-2'} text-gray-400`}>13:39 24/09/2025</Text>
                    <Text className={`text-f13 font-sfregular text-right ${Platform.OS=='ios'?'mt-2':''} text-red-400`}>13:39 24/09/2025</Text>
                    <Text className={`text-f13 font-sfregular text-right mt-2 bg-red-100 text-red-500 border border-red-300 px-2 ${Platform.OS=='ios'?'py-1':'py-0.5'} rounded-sm`}>Quá hạn 25 ngày</Text>
                </View>
            </View>
            
            <View className={`flex-row items-center ${Platform.OS=='ios'?'my-2.5':''}`}>
                <HeroSolid.MapPinIcon size={17} color={'#CECECE'} />
                <View className='ml-3'>
                    <Text className='text-f16 font-sfregular'>361A Lê Văn Sỹ</Text>
                </View>
            </View>
            <View className='relative px-4'>
                <HeroSolid.PencilSquareIcon
                    size={17}
                    color={'#CECECE'}
                    style={{ position: 'absolute', top: 4, left: 0 }}
                />
                <Text className="pl-4 text-f16 leading-7 font-sfregular">
                    <Text className="font-bold font-sfbold">Ghi chú: </Text>
                    *** Khách Viết Chênh VAT số tiền: 9.969.100đ do admin xử lý
                </Text>
            </View>
            <View className='mt-3 pt-3 border-t border-gray-100 flex-row flex-wrap'>
                <View className='flex-row flex-wrap items-center w-full justify-center'>
                    <View className='flex-row flex-wrap items-center'>
                        <HeroSolid.PhoneXMarkIcon size={22} color={'#ef4444'} />
                        <Text className='text-f15 ml-2 font-sfregular text-red-600'>Liên hệ</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default OrderItemPenddingFull
