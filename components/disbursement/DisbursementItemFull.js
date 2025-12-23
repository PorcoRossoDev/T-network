import { Platform, Text, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";

const DisbursementItemFull = ({ props }) => {
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
                <View className='w-[65%]'>
                    <Text className="text-f16 font-sfbold text-blue-700" style={{includeFontPadding: false}}>PC240925002</Text>
                    <Text className={`text-f16 font-sfmedium mt-1`} style={{includeFontPadding: false,}}>TT phí đỗ xe Gelex quý 4 năm 2025 (phí chuyển khoản 22.000đ)</Text>
                </View>

                {/* Bên phải */}
                <View className="items-end flex-1">
                    <Text className="text-right text-f16 font-sfbold mt-1" style={{includeFontPadding: false,}}>101.207.120đ</Text>
                    <View className="">
                        <Text className={`font-sfregular text-f12 ${Platform.OS == 'ios' ? 'my-1' : 'mt-2'} border border-orange-300 bg-orange-100 px-1.5 py-1 rounded-md text-orange-400`} style={{includeFontPadding: false,}}>Tạo phiếu chi</Text>
                    </View>
                    <Text className={`text-f13 font-sfregular text-right ${Platform.OS=='ios'?'mt-2':'mt-1'} text-gray-400`}>13:39 24/09/2025</Text>
                </View>
            </View>
            <View className='flex-row items-center mt-2'>
                <HeroSolid.UserCircleIcon size={19} color={'#CECECE'} />
                <View className='ml-3'>
                    <Text className='text-f16 font-sfbold'>
                        Tạo bởi: 
                        <Text className='font-sfregular' styles={{paddingLeft: 3}}> Phạm Phương Thuý</Text>
                    </Text>
                </View>
            </View>
            <View className='flex-row items-center my-2.5'>
                <HeroSolid.MapPinIcon size={17} color={'#CECECE'} />
               <View className='ml-3'>
                    <Text className='text-f16 font-sfbold'>
                        Xử lý bởi: 
                        <Text className='font-sfregular' styles={{paddingLeft: 3}}> Kế toán</Text>
                    </Text>
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
                        <HeroSolid.PrinterIcon size={26} color={'#d5d5d5'} />
                        <Text className='text-f15 ml-2 font-sfregular'>In phiếu chi</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DisbursementItemFull