import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const AttributeStack = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Khi component mount, gán callback cho route params
  useEffect(() => {
    navigation.setParams({ onAddPress: openModal });
  }, []);

  // Giá trị thuộc tính
  const [attr, setAttr] = useState(['S', 'M', 'L', 'XL'])
  const addAttr = () => {
    setAttr([...attr, ''])
  }
  const removeAttr = (index) => {
    setAttr((prev) => prev.filter((item, i) => i != index))
  }
  const changeAttr = (text, index) => {
    setAttr((prev) => prev.map((item, i) => index == i ? item = text : item))
  }

  // Item
  const ItemType = ({title, openModal}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);
    return (
      <View>
          <View className='mb-5 pb-5 border-b flex-row justify-between items-start border-gray-200'>
            <View className='flex-col justify-between'>
                <Text className='font-sfbold text-f16'>{title}</Text>
                <View className='flex-row items-center' style={{includeFontPadding: false,}}>
                    <Text className='text-gray-500 font-sfregular text-md mt-1'>Số lượng: <Text className='font-sfbold text-bloack'>4</Text></Text>
                </View>
            </View>
            <View className='justify-end items-end'>
                <View className='mt-2 flex-row flex-wrap gap-x-1.5'>
                    <TouchableOpacity onPress={openModal} className='border rounded-md p-1'>
                        <HeroOutline.PencilIcon size={15} color={'#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity className='border border-red-600 rounded-md p-1'>
                        <HeroOutline.TrashIcon size={15} color={'#dc2626'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
    )
  }

  return (
    <View className='flex-1 bg-white'>
      <ScrollView className='px-4 bg-white flex-1 relative'>
        <View className='mt-6'>
          <View className='mt-4'>
            <ItemType title='Đơn hàng dự án' openModal={openModal} />
            <ItemType title='Phụ kiện' openModal={openModal} />
            <ItemType title='Que tán hương 1000ml' openModal={openModal} />
            <ItemType title='Que tán hương 500ml' openModal={openModal} />
            <ItemType title='Que tán hương 350ml' openModal={openModal} />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.backdrop}>
          <View className='bg-white w-[80%] rounded-lg'>
            <View className='px-3 py-3'>
              <Text className='text-center font-sfbold mb-4 text-f17 mt-2'>Cập nhật</Text>
                <View>
                  <Text className='text-red-600 font-sfregular'>* <Text className='text-gray-500 font-sfregular'>Tên thuộc tính</Text></Text>
                  <TextInput 
                    value=''
                    placeholder='Nhập tên thuộc tính'
                    placeholderTextColor="#d1d5db"
                    className='border-b border-gray-200 py-3 font-sfregular text-f12'
                  />
                </View>

                <View className='mt-5'>
                  <Text className='text-red-600 font-sfregular'>* <Text className='text-gray-500 font-sfregular'>Giá trị thuộc tính</Text></Text>
                  {
                    attr.map((item, index) => {
                      return (
                        <View key={index} className='flex-row gap-x-2 items-center'>
                          <TextInput 
                            value={item}
                            placeholder='Nhập giá trị thuộc tính'
                            placeholderTextColor="#d1d5db"
                            onChangeText={(text) => changeAttr(text, index)}
                            className='border-b border-gray-200 py-2 font-sfregular text-f12 flex-1'
                          />
                          <TouchableOpacity onPress={() => removeAttr(index)} className=' rounded-md p-1 w-7'>
                            <HeroOutline.TrashIcon size={15} color={'#dc2626'} />
                        </TouchableOpacity>
                        </View>
                      )
                    })
                  }
                </View>

                <View className='justify-start items-start mt-5'>
                  <TouchableOpacity onPress={addAttr} className='bg-blue-600 flex-row items-center px-1 py-1 rounded-md gap-x-1'>
                    <View>
                      <HeroOutline.PlusIcon size='15' color='#fff' />
                    </View>
                    <Text className='text-white pr-1'>Thêm giá trị</Text>
                  </TouchableOpacity>
                </View>
            </View>
            
            <View className='mt-4 flex-row border-t border-gray-300'>
              <Pressable className='w-1/2 justify-center border-r border-gray-300' onPress={closeModal}>
                <Text className='text-center text-blue-600 py-4 text-f15 font-sfmedium'>Thoát</Text>
              </Pressable>
              <Pressable className='flex-1' onPress={closeModal}>
                <Text className='text-center text-blue-600 py-4 text-f15 font-sfmedium'>Cập nhật</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // 🔥 lớp mờ nền
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject, // cho phép click ra ngoài để đóng
  }
});

export default AttributeStack;
