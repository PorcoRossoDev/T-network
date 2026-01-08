import format from 'date-fns/format';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CalendarIcon, ChevronDownIcon, DocumentIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function JobAddStack() {
  const [focusField, setFocusField] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    sellBy: null,
    type: null,
    handleBy: null,
    calendar: null
  });

  const calendar = [
    { label: 'Một lần', value: '0' },
    { label: 'Hàng tuần', value: '1' },
    { label: 'Hàng tháng', value: '2' },
    { label: 'Tuỳ chỉnh', value: 'custom' },
  ];

  // Sản phẩm được thêm
  const [productAdd, setProductAdd] = useState([]);
  const sellBy = [{ label: 'Admin', value: '0' }];
  const handleBy = [{ label: 'Dev', value: '0' }];
  const type = [{ label: 'Black list/Chặn', value: '0' }, { label: 'Không tiềm năng', value: '1' }, { label: 'Sàn TMĐT', value: '2' }];

  // Dropdowns
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
      <ScrollView className="px-5 mb-5">
        <View className="mt-7">

          {/* Tên công việc */}
          <View className=''>
            <Text className="text-[15px] mb-2 text-gray-700 font-sfregular">
              <Text className="text-red-600 ">*</Text> Tên công việc
            </Text>
            <View className='flex-row gap-x-2 mb-4'>
              <TextInput
                value=''
                className='py-4 border border-[#ccc] px-3 rounded-lg flex-1'
                placeholder='Nhập tên công việc'
              />
            </View>
          </View>
          
          {/* Gía công việc */}
          <View className=''>
            <Text className="text-[15px] mb-2 text-gray-700 font-sfregular">
              <Text className="text-red-600 ">*</Text> Giá công việc
            </Text>
            <View className='flex-row gap-x-2 mb-4'>
              <TextInput
                value=''
                className='py-4 border border-[#ccc] px-3 rounded-lg flex-1'
                placeholder='Nhập giá công việc'
              />
            </View>
          </View>

          {renderDropdown('type', 'Phân loại', sellBy, 'Chọn...')}
          {renderDropdown('sellBy', 'Tạo bởi', sellBy, 'Chọn...')}
          {renderDropdown('handleBy', 'Xử lý bởi', sellBy, 'Chọn...')}

          {/* Loại lập lịch */}
          <View className='mt-3'>
            <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
              <Text className="text-red-600 font-sfregular">*</Text> Loại lập lịch
            </Text>
            {renderDropdown('calendar', 'Loại lập lịch', calendar, 'Chọn', true)}
          </View>
  
          {/* Ngày lập lịch tuỳ chỉnh */}
          {
            formData.calendar == 'custom' && (
              <View className='mb-3'>
                <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
                  <Text className="text-red-600">*</Text> Ngày lập lịch tuỳ chỉnh
                </Text>
                <TouchableOpacity onPress={() => setPickerVisible(true)}>
                  <View className="flex-row items-center relative">
                    <View className="w-[50px] justify-center bg-gray-100 rounded-l-lg h-full items-center flex-row">
                      <CalendarIcon size={20} />
                    </View>
                    <TextInput
                      editable={false}
                      className="border border-gray-200 py-4 flex-1 px-3 rounded-r-lg text-[14px]"
                      value={format(selectedDate, 'dd-MM-yyyy')}
                      style={{ letterSpacing: 1.5 }}
                    />
                    <View className="absolute right-2">
                      <ChevronDownIcon size={15} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }

          {/* Ghi chú */}
          <View className=''>
            <Text className="text-[15px] mb-2 text-gray-700 font-sfregular">
              <Text className="text-red-600 ">*</Text> Ghi chú
            </Text>
            <TextInput
                placeholder="Nhập ghi chú..."
                className="border border-gray-300 rounded-xl p-3 h-24 mb-4"
                multiline
              />
          </View>

          <View className=''>
            <DateTimePickerModal
              isVisible={isPickerVisible}
              mode="date"
              display="inline"
              date={selectedDate}
              onConfirm={(date) => {
                setSelectedDate(date);
                setPickerVisible(false);
              }}
              onCancel={() => setPickerVisible(false)}
            // pickerContainerStyleIOS={{ width: '100%', alignSelf: 'center' }}
            />
          </View>

        </View>
      </ScrollView>
      <View className='px-5 mb-5'>
          <View className='justify-center items-center bg-blue-500 rounded-lg'>
            <TouchableOpacity className='px-3 py-3 flex-row items-center gap-x-1 w-auto'>
              <View><DocumentIcon size='18' color='#fff' /></View>
              <Text className='text-white font-sfmedium text-base capitalize'>Tạo đơn hàng</Text>
            </TouchableOpacity>
          </View>
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
