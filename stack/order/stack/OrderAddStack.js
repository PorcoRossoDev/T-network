import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from 'react-native-element-dropdown';
import { CalendarIcon, ChevronDownIcon, DocumentIcon, PencilIcon, TrashIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function OrderAddStack() {
  const [focusField, setFocusField] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [checked, setChecked] = useState(false);


  const [formData, setFormData] = useState({
    customer: null,
    sellBy: null,
    handleBy: null,
    payment: null,
    product: null,
  });

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

  // Khách hàng Dropdown
  const customers = [
    { label: 'Nguyễn Văn A', value: '0' },
    { label: 'Nguyễn Văn B', value: '1' },
    { label: 'Nguyễn Văn C', value: '2' },
  ];

  // Danh sách sản phẩm Dropdown
  const product = [
    { label: 'Tinh dầu MINAIR Marriott', qty: 2, value: '0', price: 300000, discount: 0 },
    { label: 'Bình dầu Marian Bay Sands', qty: 3, value: '1', price: 299000, discount: 0 },
  ];

  // Sản phẩm được thêm
  const [productAdd, setProductAdd] = useState([]);
  const sellBy = [{ label: 'Admin', value: '0' }];
  const handleBy = [{ label: 'Dev', value: '0' }];
  const payments = [
    { label: 'Công nợ', value: '0' },
    { label: 'Đã thanh toán', value: '1' },
  ];

  const stats = [
    { label: 'Tổng chi tiêu', value: '1.399.000 đ', valueClass: 'text-green-600' },
    { label: 'Tổng SL đơn hàng', value: '1', valueClass: 'text-blue-600' },
    { label: 'Ngày cuối cùng mua hàng', value: '21:04 13/08/2025', valueClass: 'text-gray-700' },
    { label: 'Tổng SL sản phẩm đã mua', value: '1', valueClass: 'text-gray-700' },
    { label: 'Tổng SL sản phẩm hoàn trả', value: '0', valueClass: 'text-red-500' },
  ];

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

  const removeProduct = (id) => {
    setProductAdd(prev => {
      return prev.filter(item => item.id !== id);
    });
  }

  const ItemProduct = ({ item }) => {
    return (
      <View className="bg-gray-100 rounded-xl mb-4 p-3">
        <View className="flex-row justify-between items-start">
          {/* Thông tin sản phẩm */}
          <View className="flex-1 pr-3">
            <Text className="text-[16px] font-sfmedium text-gray-800">
              Tinh dầu Marina Bay Sands 250ml
              <Text className="text-blue-500"> ×2</Text>
            </Text>

            <View className="mt-1">
              <Text className="text-[14px] text-gray-500">
                Đơn giá: <Text className="text-gray-800 font-sfmedium">3.000.000đ</Text>
              </Text>
              <Text className="text-[14px] text-red-500 font-sfbold mt-1">
                Tổng: 6.000.000đ
              </Text>
            </View>
          </View>

          {/* Nút xóa */}
          <TouchableOpacity
            className="bg-red-50 border border-red-200 rounded-full p-2"
            onPress={() => removeProduct(item.id)}
          >
            <TrashIcon size={18} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }


  return (
    <View className='flex-1 bg-white'>
      <ScrollView className="px-5 mb-5">
        <View className="mt-7">

          {/* Thông tin khách hàng */}
          <View>
            <Text className="font-sfmedium text-[16px] mb-4">Thông tin khách hàng</Text>
            {renderDropdown('customer', 'Khách hàng', customers, 'Chọn', true)}

            {/* Nội dung chỉ hiển thị khi đã chọn */}
            {formData.customer && (
              <View className="rounded-lg">
                {/* Header / Title */}
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text className="text-lg font-sfmedium text-blue-600">A Trung (240925011)</Text>
                    <Text className="text-sm font-sfregular text-[15px] text-gray-600 mt-1">A Trung (240925011) - 0934052909</Text>
                  </View>
                  <View className="flex-row items-center">
                    <TouchableOpacity className="p-2 rounded-full mr-2 bg-white shadow-sm">
                      <PencilIcon size={18} color="#374151" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFormData(prev => ({ ...prev, customer: null }))} className="p-2 rounded-full bg-white shadow-sm">
                      <TrashIcon size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>


                {/* Contact Card */}
                <View className="bg-white rounded-2xl p-5 mb-4"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    elevation: 4,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 16,
                  }}
                >
                  <Text className="text-xl font-sfmedium text-gray-900 mb-2">Thông tin giao hàng</Text>
                  <Text className="text-base font-sfregular text-gray-700 mb-4">A Trung (240925011) - <Text className="font-medium">0934052909</Text></Text>


                  <Text className="text-lg font-sfmedium text-gray-900 mt-2">Thông tin liên hệ</Text>
                  <View className="mt-3">
                    <View className="flex-row mb-2">
                      <Text className="w-32 text-gray-600 font-sfregular">Số điện thoại:</Text>
                      <Text className="text-gray-800 font-sfregular">0934052909</Text>
                    </View>
                    <View className="flex-row">
                      <Text className="w-32 text-gray-600 font-sfregular">ĐC giao hàng:</Text>
                      <Text className="text-gray-800 flex-shrink font-sfregular">C Linh 0934042909. Keangnam Tòa 72, Phạm Hùng, HN</Text>
                    </View>
                  </View>
                </View>


                {/* Stats Card */}
                <View className="bg-white rounded-2xl px-5 mb-5"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    elevation: 4,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 16,
                  }}
                >
                  {stats.map((s, i) => (
                    <View key={i} className="py-4 border-b border-gray-100 flex-row justify-between items-center">
                      <Text className="text-base text-gray-800 font-sfregular">{s.label}</Text>
                      <Text className={`${s.valueClass} text-base font-sfbold`}>{s.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Thông tin bổ sung */}
          <View>
            <Text className="font-sfmedium text-[16px] mb-3">Thông tin bổ sung</Text>
            {renderDropdown('sellBy', 'Bán bởi', sellBy, 'Chọn...')}
            {renderDropdown('handleBy', 'Xử lý bởi', handleBy)}
            {renderDropdown('payment', 'Hình thức thanh toán', payments)}

            <View className='mb-3'>
              <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
                <Text className="text-red-600">*</Text> Ngày tạo cũ
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

            {/* Hẹn giao */}
            <View className='mb-3'>
              <Text className="font-sfregular text-[15px] mb-2 text-gray-700">
                <Text className="text-red-600">*</Text> Hẹn giao
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

            {/* Ghi chú */}
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

            {/* Check box VAT */}
            <View className='mt-2 my-3'>
              <BouncyCheckbox
                  size={18}
                  fillColor="#333"
                  unfillColor="#FFFFFF"
                  text="Yêu cầu xuất VAT"
                  iconStyle={{
                      borderColor: "#333",
                      borderRadius: 6,    // 👉 thay vì 9999, giờ là bo nhẹ
                  }}
                  innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 6,    // 👉 khớp với iconStyle
                  }}
                  textStyle={{
                      fontFamily: "SF-Pro-Display-Regular",
                      fontSize: 15,
                      color: "#333",
                      marginLeft: -5,
                      textDecorationLine: 'none'
                  }}
                  disableBuiltInState
                  isChecked={checked}
                  onPress={() => setChecked(!checked)}
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

          {/* Thông tin sản phẩm */}
          <View className='mt-4'>
            <Text className="font-sfmedium text-[16px] mb-4">Thông tin sản phẩm</Text>
            {renderDropdown('product', 'Tìm kiếm sản phẩm', product, 'Chọn', true)}

            {/* Nội dung chỉ hiển thị khi đã chọn */}
            {productAdd.length > 0 && (
              <FlatList
                data={productAdd}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ItemProduct item={item} />
                )}
              />
            )}


          </View>
            
          {/* Tổng  */}
          <View>
            <View className='flex-row justify-between items-center mb-1'>
              <Text className='font-sfregular text-base text-gray-600'>Tổng tiền (2 sản phẩm)</Text>
              <Text className='font-sfmedium text-base'>3.456.000 đ</Text>
            </View>
            <View className='flex-row justify-between items-center mb-1'>
              <Text className='font-sfregular text-base text-gray-600'>Tổng chiết khấu</Text>
              <Text className='font-sfmedium text-base text-red-500'>0 đ</Text>
            </View>
            <View className='flex-row justify-between items-center mb-1'>
              <Text className='font-sfregular text-base text-gray-600'>Khách hàng phải trả</Text>
              <Text className='font-sfmedium text-base'>3.456.000 đ</Text>
            </View>
            <View className='flex-row justify-between items-center mb-1'>
              <Text className='font-sfregular text-base text-gray-600'>Giảm giá thêm</Text>
              <TextInput
                placeholder='0'
                className='font-sfmedium text-black text-base border-b border-gray-400 min-w-40 py-1 text-right' />
            </View>
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
