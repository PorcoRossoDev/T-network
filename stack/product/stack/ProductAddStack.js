import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import * as HeroSolid from "react-native-heroicons/solid";
import { Dropdown } from 'react-native-element-dropdown';


const ProductAddStack = () => {

  const navigation = useNavigation()

  const [image, setImage] = useState(null);
  const [contentTxt, SetContentTxt] = useState(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const [focusField, setFocusField] = useState(null);
  
  const [formData, setFormData] = useState({
    category: null,
  });

   const category = [
    { label: 'Tinh dầu', value: '0' },
    { label: 'Máy tạo tinh dầu', value: '1' },
  ];

  const renderDropdown = (key, label, data, placeholder = 'Chọn...', hiddenText = false) => {
    return (
      <View className='mb-5'>
        {!hiddenText && (
          <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
            <Text className="text-red-600">*</Text> {label}
          </Text>
        )}

        <Dropdown
          style={[
            styles.dropdown,
            focusField === key && { borderColor: '#3b82f6' },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder={`Tìm ${label.toLowerCase()}...`}
          value={formData[key]}
          onFocus={() => setFocusField(key)}
          onBlur={() => setFocusField(null)}
          onChange={(item) => {
            setFormData((prev) => ({ ...prev, [key]: item.value }));
            setFocusField(null);
          }}
        />
      </View>
    );
  };

  return (
    <View className='flex-1 bg-white'>
      <ScrollView className='flex-1 px-4'>
          <View className='flex-row gap-x-2 mt-6'>
            <TouchableOpacity
              className='bg-white h-14 w-14 justify-center items-center rounded-lg self-start' 
              onPress={pickImage}
              >
              <HeroOutline.PhotoIcon size={30} color={'#3b82f6'} />
              <View className='absolute right-0 top-0'>
                <HeroSolid.PlusCircleIcon size={20} color={'#3b82f6'} />
              </View>
            </TouchableOpacity>
            {
              image ? (
                <View className='bg-white h-14 w-14 justify-center items-center rounded-lg self-start'>
                  <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  />
                </View>
              ) : (
                <></>
              )
            }
          </View>


          <View className=''>

            <View className='mt-4'>
              <Text className="text-[15px] mb-2 text-gray-700 font-sfregular">
                <Text className="text-red-600 ">*</Text> Tên sản phẩm
              </Text>
              <View className='flex-row gap-x-2 mb-4'>
                <TextInput
                  value=''
                  className='py-4 border border-[#ccc] px-3 rounded-lg flex-1'
                  placeholder='Nhập tên sản phẩm'
                />
              </View>
            </View>

            
            <View>
              <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
                <Text className="text-red-600">*</Text> Danh mục
              </Text>
              {renderDropdown('category', 'Phân loại', category, 'Chọn', true)}
            </View>

             <View className=''>
              <Text className="text-[15px] mb-2 text-gray-700 font-sfregular">
                <Text className="text-red-600 ">*</Text> Giá bán lẻ
              </Text>
              <View className='flex-row gap-x-2 mb-4'>
                <TextInput
                  value=''
                  className='py-4 border border-[#ccc] px-3 rounded-lg flex-1'
                  placeholder='Nhập tên sản phẩm'
                />
              </View>
            </View>

            <View className='mb-3'>
              <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
                Ghi chú đơn hàng
              </Text>
              <TextInput
                style={{ textAlignVertical: 'top', minHeight: 100 }}
                multiline={true}
                numberOfLines={4}
                placeholder='Nhập ghi chú...'
                className="border border-gray-200 px-3 py-3 rounded-lg text-[14px]"
              />
            </View>

          </View>
      </ScrollView>
      <View className='px-4 flex-row my-5 gap-x-2'>
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductOverviewStack')}
            className='w-[40%] justify-center h-12 rounded-lg items-center bg-white'>
            <Text className='text-f16 font-sfregular'>Huỷ</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductOverviewStack')}
            className='flex-1 justify-center items-center h-12 rounded-lg bg-blue-500'>
            <Text className='text-white text-f16 font-sfregular'>Tạo sản phẩm</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    paddingVertical: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

export default ProductAddStack;