import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    BuildingOfficeIcon,
    BuildingStorefrontIcon,
    ChevronRightIcon,
    CircleStackIcon,
    CreditCardIcon,
    TagIcon,
    UserGroupIcon,
} from 'react-native-heroicons/solid';


const OrtherSettingStack = () => {
    const navigation = useNavigation()
    return (
        <ScrollView className='bg-white'>
            <View className="flex-1 px-5 pt-8 pb-4">
                <View>
                    <Text className='font-sfmedium text-f14 uppercase'>Thiết lập cửa hàng</Text>
                    <View className='mt-4'
                        // style={{
                        //     backgroundColor: "white",
                        //     borderRadius: 10,
                        //     paddingVertical: 15,
                        //     paddingHorizontal: 15,
                        //     // Shadow cho iOS
                        //     shadowColor: "#000",
                        //     shadowOffset: { width: 0, height: 4 },
                        //     shadowOpacity: 0.1,
                        //     shadowRadius: 6,
                        //     // Shadow cho Android
                        //     elevation: 6,
                        // }}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            // paddingVertical: 15,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            borderColor: '#e5e7eb', // màu viền xám nhạt (giống Tailwind: border-gray-200)
                            // iOS shadow
                            shadowColor: '#0e3f7e',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 10,
                            // Android
                            elevation: 2,
                        }}

                    >
                        <TouchableOpacity onPress={() => navigation.navigate('SettingStoreStack')} className='flex-row justify-between items-center mb-4 pb-4 pt-4 border-b border-gray-100'>
                            <View className='flex-row items-center'>
                                <View><BuildingStorefrontIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Thông tin cửa hàng</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => (navigation.navigate('User', { screen: 'UserListStack' }))}
                            className='flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100'>
                            <View className='flex-row items-center'>
                                <View><UserGroupIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Nhân viên và phân quyền</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('PaymentStack') }}
                            className='flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100'>
                            <View className='flex-row items-center'>
                                <View><CreditCardIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Hình thức thanh toán</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => (
                                navigation.navigate('Policy', {
                                    screen: 'PolicyListStack',
                                })
                            )}
                            className='flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100'>
                            <View className='flex-row items-center'>
                                <View><CircleStackIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Chính sách giá</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => (
                                navigation.navigate('Policy', {
                                    screen: 'PolicyJobListStack',
                                })
                            )}
                            className='flex-row justify-between items-center mb-4'>
                            <View className='flex-row items-center'>
                                <View><BuildingOfficeIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Chính sách giá công việc</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='mt-8'>
                    <Text className='font-sfmedium text-f14 uppercase'>Thiết lập bán hàng</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            // paddingVertical: 15,
                            paddingHorizontal: 15,
                            // Shadow cho iOS
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            // Shadow cho Android
                            elevation: 6,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => (
                                navigation.navigate('SalesSource', {
                                    screen: 'SalesSourceListStack',
                                })
                            )}
                            className='flex-row justify-between items-center mb-4 pb-4 pt-4 border-b border-gray-100'>
                            <View className='flex-row items-center'>
                                <View><BuildingStorefrontIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Nguồn</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Orther', { screen: 'TypeStack' })}
                            className='flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100'>
                            <View className='flex-row items-center'>
                                <View><UserGroupIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Phân loại</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Customer', { screen: 'CustomerGroupStack' })}
                            className='flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100'>
                            <View className='flex-row items-center'>
                                <View><CreditCardIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Nhóm khách hàng</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Orther', { screen: 'CareScheduleListStack' })}
                            className='flex-row justify-between items-center pb-4'>
                            <View className='flex-row items-center'>
                                <View><CircleStackIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Lịch chăm sóc</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => (
                        navigation.navigate('Orther', {
                            screen: 'TagStack',
                        })
                    )}
                    className='mt-8'>
                    <Text className='font-sfmedium text-f14 uppercase'>Hash Tag</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            // paddingVertical: 15,
                            paddingHorizontal: 15,
                            // Shadow cho iOS
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            // Shadow cho Android
                            elevation: 6,
                        }}
                    >
                        <View className='flex-row justify-between items-center pb-4 pt-4'>
                            <View className='flex-row items-center'>
                                <View><TagIcon size={20} color={'#2563eb'} /></View>
                                <Text className='ml-2 font-sfregular text-f15'>Danh sách Tags</Text>
                            </View>
                            <View>
                                <ChevronRightIcon size={17} color={'#9ca3af'} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default OrtherSettingStack;