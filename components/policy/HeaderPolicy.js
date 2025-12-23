import { useCallback, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import * as HeroSolid from "react-native-heroicons/solid";
// import BottomOrderFilterSheet from './BottomOrderFilterSheet';

const HeaderPolicy = ({ title, navigation, route }) => {

  const bottomSheetRef = useRef(null);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  console.log(title)

  return (
    <View className='bg-white'
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        //paddingVertical: 16,
        // Shadow cho iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Shadow cho Android
        elevation: 2,
      }}
    >
      {/* Phần trên của header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginBottom: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#0089FF', fontWeight: '600' }}>
            <HeroSolid.ArrowLeftIcon size={22} />
          </Text>
        </TouchableOpacity>
        <Text
            style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
            color: '#333',
            }}
        >
        {title}
      </Text>
        <View className='flex-row items-center'>
          <TouchableOpacity className='justify-center items-center' onPress={() => alert('Tìm kiếm')}>
            <HeroSolid.PlusIcon size={22} color={'#333'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tìm kiếm */}
      <View className='px-4 mt-5'>
        <View className='border border-gray-100 rounded-3xl p-3 mb-4 relative flex-row flex-wrap items-center bg-gray-100'>
          <HeroOutline.MagnifyingGlassIcon className='relative top-[10px]' size={18} color={'#6b7280'} />
          <TextInput
            placeholderTextColor="#6b7280"
            className='pl-2 py-1 text-gray-500 text-f14'
            placeholder='Nhập từ khoá tìm kiếm...'
          />
        </View>
      </View>
    </View>

  );
}

export default HeaderPolicy