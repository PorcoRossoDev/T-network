import { Platform, Text, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";

const OrderItemFull = ({ props }) => {
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
                    <Text className="text-f18 font-sfbold text-blue-700" style={{includeFontPadding: false,}}>240619-122</Text>
                    <Text className="text-f18 font-sfbold" style={{includeFontPadding: false,}}>3.199.200 đ</Text>
                </View>

                {/* Bên phải */}
                <View className="items-end">
                    <View className="bg-red-500 px-3 py-1 rounded-lg">
                        <Text className="text-white font-sfbold text-f14 font-bold" style={{includeFontPadding: false,}}>Xuất kho</Text>
                    </View>
                    <Text className={`text-f13 font-sfregular text-right ${Platform.OS=='android'?'mt-1':'mt-2'} text-gray-400`}>13:39 24/09/2025</Text>
                    <Text className={`text-right text-f15 font-sfbold ${Platform.OS=='android'?'':'mt-1'}`} style={{includeFontPadding: false,}}>Tuấn Anh</Text>
                </View>
            </View>
            <View className='flex-row items-center'>
                <HeroSolid.UserCircleIcon size={19} color={'#CECECE'} />
                <View className='ml-3'>
                    <Text className='text-f16 font-sfregular'>
                        Anh Việt - {' '}
                        <Text className='font-medium underline ml-6' styles={{paddingLeft: 3}}>098765637</Text>
                    </Text>
                </View>
            </View>
            <View className={`flex-row items-center ${Platform.OS=='android'?'mt-1':'my-2.5'}`}>
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
            <View className='flex-row flex-wrap mt-3'>
                <View className='flex-row flex-wrap items-center w-1/2'>
                    <Text className='text-f16 font-sfregular'>Thanh toán</Text>
                    <Text className='w-3 h-3 bg-black rounded-full ml-5'></Text>
                </View>
                <View className='flex-row flex-wrap items-center w-1/2'>
                    <Text className='text-f16 font-sfregular'>VAT</Text>
                    <Text className='w-3 h-3 bg-red-600 rounded-full ml-5'></Text>
                </View>
            </View>
            <View className='mt-3 pt-3 border-t border-gray-100 flex-row flex-wrap'>
                <View className='flex-row flex-wrap items-center w-1/2 justify-center'>
                    <View className='flex-row flex-wrap items-center'>
                        <HeroSolid.PrinterIcon size={26} color={'#d5d5d5'} />
                        <Text className='text-f15 ml-2 font-sfregular'>In đơn hàng</Text>
                    </View>
                </View>
                <View className='flex-row flex-wrap items-center w-1/2 justify-center border-l border-gray-200'>
                    <View className='flex-row flex-wrap items-center'>
                        <HeroSolid.TruckIcon size={26} color={'#d5d5d5'} />
                        <Text className='text-f15 ml-2 font-sfregular'>Nhận đơn giao</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default OrderItemFull