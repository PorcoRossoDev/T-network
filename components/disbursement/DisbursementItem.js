import { Platform, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DisbursementItem = ({ props }) => {

    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DisbursementDetailStack')} className='bg-white p-4 mb-4'
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
            <View className="flex-row flex-grow justify-between items-start">
                {/* Bên trái */}
                <View className='w-[60%]'>
                    <Text className="text-f16 font-sfmedium" style={{includeFontPadding: false,}}>Phí ship hàng từ kho lên Công ty ngày 09/10/2025 (2 lần)</Text>
                    <Text className={`font-sfregular text-f15 ${Platform.OS == 'ios' ? 'my-1' : 'my-1'} text-gray-700`} style={{includeFontPadding: false,}}>Kế toán</Text>
                    <Text className='font-sfregular text-gray-700 text-f14' style={{includeFontPadding: false,}}>14:51 09/10/2025</Text>
                </View>

                {/* Bên phải */}
                <View className="flex-1 justify-end items-end">
                    <Text className='font-sfmedium text-f17'>69.000 đ</Text>
                        <Text className={`font-sfregular text-f12 ${Platform.OS == 'ios' ? 'my-1' : ''} border border-orange-300 bg-orange-100 px-1.5 py-1 rounded-md text-orange-400`} style={{includeFontPadding: false,}}>Tạo phiếu chi</Text>
                        <Text className='font-sfregular text-f15 text-gray-700 mt-0.5'>Phạm Phương Thuý</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DisbursementItem