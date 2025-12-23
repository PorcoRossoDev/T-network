import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";


const RoleItemCheck = ({ toggleActive, active = false }) => {
    const navigation = useNavigation()
    const activeItem = active ? 'border-blue-600 text-blue-700' : 'border-gray-400'
    return (
        <TouchableOpacity
            onPress={toggleActive}
            className={`relative w-[48.5%] mt-3 border rounded-lg px-3 py-3 overflow-hidden ${active ? 'border-blue-600' : 'border-gray-400'
                }`}
        >
            <Text className={`${active ? 'text-blue-700' : 'text-gray-700'}`}>
                Xem khách hàng
            </Text>

            {/* ✅ Góc phải dưới */}
            {active && (
                <View className="relative">
                    <View
                        className="absolute w-8 h-8 -bottom-3 -rotate-90 -right-3 bg-blue-600 justify-center items-center"
                        style={{
                        width: 0,
                        height: 0,
                        borderLeftWidth: 20,
                        borderTopWidth: 20,
                        borderLeftColor: 'transparent',
                        borderTopColor: 'white',
                        }}
                    >
                        <View className='absolute bottom-0 right-2 justify-center items-center rotate-90'>
                            <HeroOutline.CheckIcon size={13} color="#fff" />
                        </View>
                    </View>
                </View>
            )}
        </TouchableOpacity>

    )
}

export default RoleItemCheck
