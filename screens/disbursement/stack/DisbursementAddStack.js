import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CalendarIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const DisbursementAddStack = () => {


  const [formData, setFormData] = useState({
    createBy: null,
    doBy: null,
    calendar: null,
  });

  const [focusField, setFocusField] = useState(null);

  useEffect(() => {


    if (!formData.product) return; // nếu null thì không làm gì

    const selectedProduct = product.find(p => p.value === formData.product);
    if (!selectedProduct) return;

    setProductAdd(prev => {
      const exists = prev.some(item => item.value === selectedProduct.value);

      if (exists) {
        // nếu đã tồn tại → xóa
        return prev.filter(item => item.value !== selectedProduct.value);
      } else {
        // nếu chưa có → thêm
        return [...prev, selectedProduct];
      }
    });

    // reset dropdown về null
    setFormData(prev => ({ ...prev, product: null }));

  }, [formData.product]);

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

  const createBy = [
    { label: 'Admin', value: '0' },
  ];
  const doBy = [
    { label: 'Admin', value: '0' },
  ];
  const calendar = [
    { label: 'Một lần', value: '0' },
    { label: 'Hàng tuần', value: '1' },
    { label: 'Hàng tháng', value: '2' },
    { label: 'Tuỳ chỉnh', value: 'custom' },
  ];

  // Thơi gian
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  return (
    <View className='flex-1 bg-white pt-8'>
      <ScrollView className='flex-1 px-4'>

        {/* Tiêu đề */}
        <View className=''>
          <Text className="text-[15px] mb-2 text-gray-700 font-sfregular">
            <Text className="text-red-600 ">*</Text> Tiêu đề
          </Text>
          <View className='flex-row gap-x-2 mb-4'>
            <TextInput
              value=''
              className='py-4 border border-[#ccc] px-3 rounded-lg flex-1'
              placeholder='Nhập tiêu đề phiếu chi'
            />
          </View>
        </View>

        {/* Số tiền */}
        <View className=''>
          <Text className="text-[15px] mb-2 text-gray-700 font-sfregular">
            <Text className="text-red-600 ">*</Text> Số tiền (VNĐ)
          </Text>
          <View className='flex-row gap-x-2 mb-4'>
            <TextInput
              value=''
              className='py-4 border border-[#ccc] px-3 rounded-lg flex-1'
              placeholder='Nhập số tiền (VD: 1.000.000)'
            />
          </View>
        </View>

        {/* Thực hiện bởi */}
        <View className='mt-3'>
          <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
            <Text className="text-red-600 font-sfregular">*</Text> Thực hiện bởi
          </Text>
          {renderDropdown('doBy', 'Thực hiện bởi', doBy, 'Chọn', true)}
        </View>
        
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

        {/* Tạo bở */}
        <View className='mt-3'>
          <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
            <Text className="text-red-600 font-sfregular">*</Text> Tạo bởi
          </Text>
          {renderDropdown('createBy', 'Tạo bởi', createBy, 'Chọn', true)}
        </View>

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

      </ScrollView>
      <View className='px-4 flex-row my-5 gap-x-2'>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductOverviewStack')}
          className='flex-1 justify-center items-center h-12 rounded-lg bg-blue-500'>
          <Text className='text-white text-f16 font-sfregular'>Tạo phiếu chi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DisbursementAddStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
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
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: '#2563eb',
  },
  result: { marginTop: 20, fontSize: 16, color: '#2563eb' },
});
