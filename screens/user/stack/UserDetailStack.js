import { Image, Platform, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const UserDetail = ({ navigation }) => {
  return (
    <View className='flex-1 bg-white'>
      <ScrollView className='px-4 bg-white flex-1 relative'>
        <View className='mt-6'>
            <View>
              <Text className='font-sfmedium text-f15 text-gray-500'>Tên đăng nhập</Text>
              <TextInput 
              className='border-b h-10 font-sfregular text-f14 border-gray-200'
              placeholder=''
              />
            </View>
            <View className='mt-4'>
              <Text className='font-sfmedium text-f15 text-gray-500'>Vai trò</Text>
              <TextInput 
              className='border-b h-10 font-sfregular text-f14 border-gray-200'
              placeholder=''
              />
            </View>
            <View className='mt-4'>
              <Text className='font-sfmedium text-f15 text-gray-500'>Tên nhân viên</Text>
              <TextInput 
              className='border-b h-10 font-sfregular text-f14 border-gray-200'
              placeholder=''
              />
            </View>
            <View className='mt-4'>
              <Text className='font-sfmedium text-f15 text-gray-500'>Địa chỉ</Text>
              <TextInput 
              className='border-b h-10 font-sfregular text-f14 border-gray-200'
              placeholder=''
              />
            </View>
            <View className='mt-3 border-b border-gray-200 pb-5 mb-2'>
              <Text className='font-sfmedium text-f15 text-gray-500'></Text>
              <View className='flex-row justify-start items-center' style={{includeFontPadding: false,}}>
                  <Switch
                      trackColor={{ false: '#d1d5db', true: '#2563eb' }}
                      thumbColor="#fff"
                      value={false}
                      // onValueChange={toggleSwitch}
                      style={{ transform: [{ scale: Platform.OS == 'ios' ? 0.7 : 0.9 }],includeFontPadding: false }}
                      android_ripple={{ color: 'transparent' }} // tránh hiệu ứng ripple che màu
                  />
                  <Text>Giữ nguyên mật khẩu</Text>
              </View>
            </View>
            <View className='mt-4'>
              <Text className='font-sfmedium text-f15 text-gray-500'>Trạng thái</Text>
              <TextInput 
              className='border-b h-10 font-sfregular text-f14 border-gray-200'
              placeholder=''
              />
            </View>
            <View className='mt-4'>
              <Text className='font-sfmedium text-f15 text-gray-500'>Email</Text>
              <TextInput 
              className='border-b h-10 font-sfregular text-f14 border-gray-200'
              placeholder=''
              />
            </View>
            <View className='mt-4'>
              <Text className='font-sfmedium text-f15 text-gray-500'>Ngày sinh</Text>
              <TextInput 
              className='border-b h-10 font-sfregular text-f14 border-gray-200'
              placeholder=''
              />
            </View>
            <View className='flex-row justify-between items-center mt-4'>
              <View className='justify-center flex-col w-1/2 gap-x-3 items-center mt-4'>
                  <Text>Ảnh đại diện</Text>
                  <View>
                    <View className='mt-2 bg-white h-14 w-14 justify-center items-center rounded-lg self-start'>
                        <Image
                        className='border border-gray-300 rounded-md'
                        style={{ width: '100%', height: '100%', borderRadius: 10 }}
                        />
                    </View>
                  </View>
              </View>
              <View className='justify-center flex-col w-1/2 gap-x-3 items-center mt-4'>
                  <Text>Ảnh chữ ký</Text>
                  <View>
                    <View className='mt-2 bg-white h-14 w-14 justify-center items-center rounded-lg self-start'>
                        <Image
                        className='border border-gray-300 rounded-md'
                        style={{ width: '100%', height: '100%', borderRadius: 10 }}
                        />
                    </View>
                  </View>
              </View>
          </View>
        </View>
      </ScrollView>
      <View className='flex-row justify-center gap-x-4 items-center px-5 mb-4'>
        <TouchableOpacity className='flex-row gap-x-1 w-[40%] h-11 justify-center items-center border-red-300 border rounded-md'>
          <View><HeroOutline.TrashIcon size={20} color={'red'} /></View>
          <Text className='text-red-600'>Xoá</Text>
        </TouchableOpacity>
        <TouchableOpacity className='h-11 rounded-md items-center flex-row justify-center border-red-300 flex-1 bg-blue-700'>
          <Text className='text-white'>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetail;
