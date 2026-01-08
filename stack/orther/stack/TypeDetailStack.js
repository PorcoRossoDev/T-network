import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const ItemKPI = ({index, onAdd, isLast, onDelete}) => {
  return (
    <View className='mb-3'>
      <Text className='text-gray-500 text-f15 font-sfregular'>Doanh thu</Text>
      <View className='flex-row justify-between items-center'>
        <TextInput
        value='1.000.000'
        className='w-[40%] border-b py-3 border-gray-300'
        />
        <HeroOutline.ArrowsRightLeftIcon size={20} />
        <TextInput
        value='99.999.999'
        className='w-[40%] border-b py-3 border-gray-300'
        />
      </View>
      <Text className='text-gray-500 text-f15 font-sfregular mt-3'>Hoa hồng</Text>
      <TextInput
        value='3'
        className='border-b py-3 border-gray-300'
        />
        <View className='justify-center items-center flex-row mt-5'>
          <TouchableOpacity onPress={onDelete} className='bg-red-500 flex-row gap-x-1 rounded-lg py-2 px-4 justify-center items-center'>
            <HeroOutline.TrashIcon size={20} color='#fff' />
            <Text className='text-white text-f15 font-sfregular'>Xoá</Text>
          </TouchableOpacity>
          {isLast && (
            <TouchableOpacity
              onPress={onAdd}
              className='bg-blue-500 flex-row gap-x-1 rounded-lg py-2 px-4 justify-center items-center mx-1'
            >
              <HeroOutline.PlusIcon size={20} color='#fff' />
              <Text className='text-white text-f15 font-sfregular'>Thêm mới</Text>
            </TouchableOpacity>
          )}
        </View>
    </View>
  )
}

const TypeDetailStack = ({ navigation }) => {

  const [KPI, setKPI] = useState([{id: Date.now()}])
  const addKPI = () => {
    setKPI((prev) => [...prev, {id: Date.now()}])
  }

  const removeKPI = (id) => {
    setKPI((prev) => prev.filter((item) => item.id != id))
  }

  return (
    <View className='flex-1 bg-white'>
      <ScrollView className='px-4 bg-white flex-1 relative'>
        <View className='mt-6'>
          <View className=''>
            <Text className='font-sfmedium text-f16'>Tạo phân loại</Text>
            <View
              className='mt-4'
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
              }}>
              <View className=''>
                <View>
                  <Text className='text-red-600 font-sfregular'>* <Text className='text-gray-500 font-sfregular text-f15'>Tiêu đề phân loại</Text></Text>
                  <TextInput
                    value='Đơn giao xa'
                    className='border-b border-gray-200 py-2 font-sfregular text-f15'
                  />
                </View>
                <View className='mt-4'>
                  <Text className='text-red-600 font-sfregular text-f15'>* <Text className='text-gray-500 font-sfregular text-f15'>Màu sắc</Text></Text>
                  <View className='flex-row items-end gap-x-3'>
                    <TouchableOpacity
                      onPress={() => setColorPickerVisible(true)}
                      className='bg-[#0089FF] w-10 h-7'
                    ></TouchableOpacity>
                    <TextInput
                      value={'#000000'}
                      onChangeText={''}
                      className='border-b border-gray-200 py-2 font-sfregular text-f15 flex-1'
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='mt-6'>
          <View className=''>
            <Text className='font-sfmedium text-f16'>Danh sách KPI</Text>
            <View
              className='mt-4'
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
              }}>
                {
                  KPI.map((item, index) => (
                    <ItemKPI 
                    key={item.id}
                    isLast={index === KPI.length - 1}
                    index={index}
                    onAdd={addKPI}
                    onDelete={() => removeKPI(item.id)}
                    />
                  ))
                }
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TypeDetailStack;
