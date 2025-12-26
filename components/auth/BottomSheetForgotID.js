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
import FontAwesome from '@expo/vector-icons/FontAwesome';

// forwardRef cho phép parent gọi ref.present()
const BottomSheetForgotID = forwardRef((props, ref) => {
  const { snapPoints = ['40%'], onClose } = props;

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
      <BottomSheetView className=''>
        <View className='mt-3'>
          <View className="bg-white">
    
            <View className="px-4">
              <Text className="text-xl font-bold">Chọn một phương thức</Text>
              <Text className="text-gray-500 mt-1 text-f15">Chọn một phương thức để lấy lại ID của bạn</Text>
            </View>
    
            <View className="px-4 mt-5 relative">
              <View className="bg-gray-100 py-3 px-3 rounded-xl flex-row items-center mb-2">
                <View className="bg-white w-11 h-11 justify-center items-center rounded-xl mr-4">
                  <MaterialIcons name="email" size={24} color="#eab308" />
                </View>
                <Text>Xác minh qua Email</Text>
              </View>

              <View className="bg-gray-100 py-3 px-3 rounded-xl flex-row items-center">
                <View className="bg-white w-11 h-11 justify-center items-center rounded-xl mr-4">
                  <FontAwesome name="google" size={24} color="red" />
                </View>
                <Text>Xác minh qua Gmail</Text>
              </View>

            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheetForgotID;

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
