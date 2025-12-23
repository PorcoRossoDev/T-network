import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const TypeItem = ({ navigation, background='#000000', title=''}) => {
  return (
    <View>
        <View className='mb-5 pb-5 border-b flex-row justify-between items-start border-gray-200'>
          <Text className='w-[40%] font-sfbold text-f16'>{title}</Text>
          <View className='w-[40%] justify-center items-center'>
            <Text className='font-sfregular text-f14 rounded-lg text-white px-2 py-1' style={{backgroundColor: background}}>{background}</Text>
          </View>
          <View className='flex-1 justify-end flex-row flex-wrap gap-x-1.5'>
              <TouchableOpacity onPress={()=> navigation.navigate('Orther', {screen: 'TypeDetailStack'})} className='border rounded-md p-1'>
                  <HeroOutline.PencilIcon size={15} color={'#333'} />
              </TouchableOpacity>
              <TouchableOpacity className='border border-red-600 rounded-md p-1'>
                  <HeroOutline.TrashIcon size={15} color={'#dc2626'} />
              </TouchableOpacity>
          </View>
      </View>
  </View>
  )
}

const TypeDetailStack = ({ navigation }) => {
  return (
    <View className='flex-1 bg-white'>
      <ScrollView className='px-4 bg-white flex-1 relative'>
        <View className='mt-6'>
          <View className='mt-4'>
            <TypeItem navigation={navigation} background={'#000000'} title={'Black List/Chặn'} />
            <TypeItem navigation={navigation} background={'#bdbdbd'} title={'Không tiềm năng'} />
            <TypeItem navigation={navigation} background={'#ed790c'} title={'Sàn TMĐT'} />
            <TypeItem navigation={navigation} background={'#7c0fa3'} title={'Tỉnh/Công ty'} />
            <TypeItem navigation={navigation} background={'#EA4335'} title={'Hồ Chí Minh'} />
            <TypeItem navigation={navigation} background={'#6591d7'} title={'Hà Nội'} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TypeDetailStack;
