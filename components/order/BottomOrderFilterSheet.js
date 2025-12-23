import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import format from 'date-fns/format';
import { forwardRef, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CalendarIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from 'react-native-modal-datetime-picker';



// forwardRef cho phép parent gọi ref.present()
const BottomOrderFilterSheet = forwardRef((props, ref) => {

  // DatePicker
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());


  const { snapPoints = ['50%', '80%'], onClose } = props;
  // render backdrop mờ
  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  // Dropdown khách hàng
  const customers = [
    { label: 'Nguyễn Văn A', value: '0' },
    { label: 'Nguyễn Văn B', value: '1' },
    { label: 'Nguyễn Văn C', value: '2' },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.indicator}
      onDismiss={onClose}
    >
      <BottomSheetView className='py-3 flex-1'>
        <View className='flex-row justify-between items-center mb-2 flex-1 px-5 border-b border-gray-200 pb-6'>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-f17 text-blue-500 font-sfregular">Huỷ</Text>
          </TouchableOpacity>
          <Text className='font-sfbold text-f16 uppercase'>Bộ lọc</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-f17 text-blue-500 font-sfregular">Lưu</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='px-4 flex-1' keyboardShouldPersistTaps="handled">
          <View className='mt-4 z-[1000]'>
            <View>
              <Text className='text-f16 font-sfmedium'>Khách hàng</Text>
              <View className='mt-3'>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={customers}
                  search
                  maxHeight={150}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Chọn khách hàng' : '...'}
                  searchPlaceholder="Chọn khách hàng..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            
            {/* Thời gian */}
            <View className='mt-6'>
              <Text className='text-f16 font-sfmedium'>Thời gian</Text>
              <View className='flex-row gap-x-4 mt-3'>
                <View className='flex-1'>
                  
                  <View className=''>
                    <View className='flex-row items-center relative'>
                      <View className='w-[50px] justify-center bg-gray-100 rounded-l-lg h-full items-center flex-row'><CalendarIcon size={20} /></View>
                      <TextInput
                        onPress={() => setPickerVisible(true)}
                        className='border border-gray-200 h-[50px] flex-1 px-3 rounded-r-lg text-f15'
                        placeholderTextColor="#6b7280"
                        value={format(selectedDate, 'dd-MM-yyyy')}
                        style={{ letterSpacing: 1.5 }}
                        placeholder='' />
                        <View className='absolute right-2'><ChevronDownIcon size={15} /></View>

                    </View>
                    <DateTimePickerModal
                      isVisible={isPickerVisible}
                      mode="date"                 // Chọn ngày
                      display='inline'
                      date={selectedDate}         // Giá trị mặc định
                      onConfirm={(date) => {
                        setSelectedDate(date);
                        setPickerVisible(false);
                      }}
                      onCancel={() => setPickerVisible(false)}
                    />
                  </View>
                </View>

                <View className='flex-1'>
                  <View className=''>
                    <View className='flex-row items-center relative'>
                      <View className='w-[50px] justify-center bg-gray-100 rounded-l-lg h-full items-center flex-row'><CalendarIcon size={20} /></View>
                      <TextInput
                        onPress={() => setPickerVisible(true)}
                        className='border border-gray-200 h-[50px] flex-1 px-3 rounded-r-lg text-f15'
                        placeholderTextColor="#6b7280"
                        value={format(selectedDate, 'dd-MM-yyyy')}
                        style={{ letterSpacing: 1.5 }}
                        placeholder='' />
                        <View className='absolute right-2'><ChevronDownIcon size={15} /></View>

                    </View>
                    <DateTimePickerModal
                      isVisible={isPickerVisible}
                      mode="date"                 // Chọn ngày
                      display='inline'
                      date={selectedDate}         // Giá trị mặc định
                      onConfirm={(date) => {
                        setSelectedDate(date);
                        setPickerVisible(false);
                      }}
                      onCancel={() => setPickerVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </View>


            <View className='flex-row mt-6 gap-x-4'>
              <View className='flex-1'>
                <View>
                  <Text className='text-f16 font-sfmedium'>Thanh toán</Text>
                  <View className='mt-3'>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={customers}
                      search
                      maxHeight={150}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? '' : '...'}
                      searchPlaceholder="Thanh toán..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View className='flex-1'>
                <View>
                  <Text className='text-f16 font-sfmedium'>Nguồn đơn hàng</Text>
                  <View className='mt-3'>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={customers}
                      search
                      maxHeight={150}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? '' : '...'}
                      searchPlaceholder="..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>


            <View className='mt-5'>
                <View>
                  <Text className='text-f16 font-sfmedium'>Phương thức thanh toán</Text>
                  <View className='mt-3'>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={customers}
                      search
                      maxHeight={150}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? '' : '...'}
                      searchPlaceholder="..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>
            </View>

            <View className='mt-5'>
                <View>
                  <Text className='text-f16 font-sfmedium'>Xuất VAT</Text>
                  <View className='mt-3'>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={customers}
                      search
                      maxHeight={150}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? '' : '...'}
                      searchPlaceholder="..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>
            </View>
            
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomOrderFilterSheet;

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    backgroundColor: '#ccc',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },

  // dropdown
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#f3f4f6',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
