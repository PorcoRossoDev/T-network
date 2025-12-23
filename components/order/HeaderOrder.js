import { useCallback, useRef } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import * as HeroSolid from "react-native-heroicons/solid";
import BottomOrderFilterSheet from './BottomOrderFilterSheet';

const HeaderOrder = ({ title, navigation, route, onToggleLayout, layoutOrderPendding = false }) => {

  const bottomSheetRef = useRef(null);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <View className='bg-white'
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Phần trên của header */}
      <View
        className='flex-row justify-between items-center px-4 mb-2'
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#0089FF', fontWeight: '600' }}>
            <HeroSolid.ArrowLeftIcon size={20} />
          </Text>
        </TouchableOpacity>
        <View className='flex-row items-center'>
          <TouchableOpacity
            className='bg-gray-200 w-10 h-10 justify-center items-center rounded-full'
            onPress={onToggleLayout}>
            <HeroOutline.Squares2X2Icon size={19} color={'#333'} />
          </TouchableOpacity>
          <TouchableOpacity className='bg-gray-200 w-10 h-10 justify-center items-center rounded-full ml-2' onPress={() => alert('Tìm kiếm')}>
            <HeroSolid.EllipsisVerticalIcon size={23} color={'#333'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Phần tiêu đề */}
      <Text className='font-sfbold text-f20 text-center'>
        {title}
      </Text>

      {/* Tìm kiếm */}
      <View className={`px-4 ${Platform.OS=='android'?'mt-2':'mt-4'}`}>
        <View className='border border-gray-100 rounded-3xl p-3 mb-4 relative flex-row flex-wrap items-center bg-gray-100'>
          <HeroOutline.MagnifyingGlassIcon className='relative top-[10px]' size={18} color={'#6b7280'} />
          <TextInput
            placeholderTextColor="#6b7280"
            className='pl-2 py-1 font-sfregular text-gray-500 text-f15'
            placeholder='Tìm kiếm theo id, mã đơn hàng'
          />
        </View>
      </View>

      {/* Lọc */}
      <View className='px-4 mt-3 flex-row justify-between'>
        <Text className='pb-4 text-blue-600 text-f15 font-sfmedium px-3 border-b-2 border-blue-600'>Tất cả</Text>
        <TouchableOpacity
          onPress={openSheet}
        >
          <HeroOutline.FunnelIcon size={25} />
        </TouchableOpacity>
      </View>

      <BottomOrderFilterSheet ref={bottomSheetRef} onClose={closeSheet} />

    </View>

  );
}

export default HeaderOrder