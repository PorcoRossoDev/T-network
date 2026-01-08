import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// forwardRef cho phép parent gọi ref.present()
const BottomSheetForgotPIN = forwardRef((props, ref) => {
  const { snapPoints = ['90%'], onClose } = props;

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
      <BottomSheetView className='py-3'>
        <View className=''>
          <View className="bg-white mt-10">
    
            <View className="px-4">
              <Text className="text-center text-2xl font-sgbold mt-8">Đăng nhập</Text>
              <Text className="text-center text-gray-500 mt-3 text-f15 font-sgregular leading-5">Đăng nhập bằng khuôn mặt của bạn - Chìa khoá chính là mật khẩu của bạn. Chỉ cần quét và bắt đầu.</Text>
            </View>
    
            <View className="px-4 mt-8 relative">
              <View className="border border-primary rounded-2xl h-[70px] px-3 flex-row items-center">
                <View className="">
                  <MaterialIcons name="perm-contact-cal" size={24} color="#9ca3af" />
                </View>
                <View className="w-[1px] h-[55%] bg-gray-300 mx-2"></View>
                <View className="">
                  <Text className="text-gray-400 font-sgregular mb-1">Nhập ID của Bạn</Text>
                  <TextInput
                    value={'binh@'}
                    onChangeText={''}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                    className="font-sgregular"
                    placeholder=""
                    placeholderTextColor="#9ca3af"
                      />
                </View>
                <TouchableOpacity onPress={''} className="w-5 h-5 justify-center items-center bg-gray-300 rounded-full absolute right-3">
                    <MaterialIcons name="clear" size={15} color="#9ca3af" />
                  </TouchableOpacity>
              </View>
              <TouchableOpacity className="mt-4">
                  <Text className="text-center font-sgbold text-blue-600">Quên ID đăng nhập?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheetForgotPIN;

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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});
