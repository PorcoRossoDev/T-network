import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ActivityStack = () => {
    return (
        <ScrollView className='bg-white'>
            <View className='px-5 pt-8 pb-4'>
                <View>
                    <Text className='font-sfmedium text-f16'>Thông tin chung</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 15,
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
                        <TextInput 
                        className='border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Tên công ty, tổ chức, cá nhân'
                        />
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row gap-x-3 items-center mt-4'>
                                <Text>Logo</Text>
                                <View className='bg-white h-14 w-14 justify-center items-center rounded-lg self-start'>
                                    <Image
                                    className='border border-gray-300 rounded-md'
                                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                    />
                                </View>
                            </View>
                            <View className='flex-row gap-x-3 items-center mt-4'>
                                <Text>Favicon</Text>
                                <View className='bg-white h-14 w-14 justify-center items-center rounded-lg self-start'>
                                    <Image
                                    className='border border-gray-300 rounded-md'
                                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='mt-7'>
                    <Text className='font-sfmedium text-f16'>Thông tin liên lạc</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 15,
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
                        <TextInput 
                        className='border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Địa chỉ'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Showroom'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Tel'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Hotline'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Email'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Facebook'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Website'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Mã số thuế'
                        />
                    </View>
                </View>
                <View className='mt-7'>
                    <Text className='font-sfmedium text-f16'>Cấu hình tiêu đề</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 15,
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
                        <TextInput 
                        className='border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Tiêu đề SEO'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Mô tả SEO'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Keyword SEO'
                        />
                    </View>
                </View>
                <View className='mt-7'>
                    <Text className='font-sfmedium text-f16'>Thông tin ngân hàng</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 15,
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
                        <TextInput 
                        className='border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Tên ngân hàng'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Số tài khoản'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Tên tài khoản'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Chi nhánh'
                        />
                        <TextInput 
                        className='mt-3 border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Mã ngân hàng'
                        />
                    </View>
                </View>
                <View className='mt-7'>
                    <Text className='font-sfmedium text-f16'>Điều khoản và điều kiện</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 15,
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
                        <TextInput 
                        className='border-b h-20 font-sfregular text-f14 border-gray-200'
                        placeholder='Nhập nội dung'
                        />
                    </View>
                </View>
                <View className='mt-7'>
                    <Text className='font-sfmedium text-f16'>Phần trăn chi phí phiếu chi</Text>
                    <View className='mt-4'
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 15,
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
                        <TextInput 
                        className='border-b h-10 font-sfregular text-f14 border-gray-200'
                        placeholder='Nhập nội dung'
                        />
                    </View>
                </View>
                <View className='my-5'>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('ProductOverviewStack')}
                    className='flex-1 justify-center items-center h-12 rounded-lg bg-blue-500'>
                    <Text className='text-white text-f16 font-sfregular'>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ActivityStack;