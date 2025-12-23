import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// forwardRef cho phép parent gọi ref.present()
const BottomSheet = forwardRef((props, ref) => {
  const { snapPoints = ['70%'], onClose, children } = props;

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

  const handleSheetChange = useCallback(
    (index) => {
      if (index === -1) {
        onClose?.();  // callback parent
      }
    },
    [onClose]
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
      onChange={handleSheetChange}
    >
      <BottomSheetView className='py-3'>
        <View className='flex-row justify-between items-center mb-2 flex-1 px-5 border-b border-gray-200 pb-6'>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-f16 text-blue-500 font-medium">Huỷ</Text>
          </TouchableOpacity>
          <Text className='font-medium text-f17'>Phím tắt</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-f16 text-blue-500 font-medium">Lưu</Text>
          </TouchableOpacity>
        </View>

        <View className=''>
          <View className="flex-row flex-wrap mt-6">
            {/* <ViewImage /> */}
            {children}
          </View>
        </View>


      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheet;

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
