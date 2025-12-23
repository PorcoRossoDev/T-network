import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionItem } from '../home/index';

// forwardRef cho phép parent gọi ref.present()
const BottomSheetActions = forwardRef((props, ref) => {
  const { snapPoints = ['70%'], onClose, actionList, activeActions, handleActionToggle } = props;
  const actionListActive = actionList.filter(item => activeActions.includes(item.id));
  const actionListNotActive = actionList.filter(item => !activeActions.includes(item.id));

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
              {actionListActive.map((item, index) => (
                  <View key={index} className="w-1/4">
                      <ActionItem actionButton={()=>handleActionToggle(item.id)} name={item.name} icon={item.icon} variant={item?.variant ?? 'solid'} background={item.background} close={true} />
                  </View>
              ))}
          </View>
        </View>

        <View className='border-t border-gray-200'>
          <View className="flex-row flex-wrap mt-6">
              {actionListNotActive.map((item, index) => (
                  <View key={index} className="w-1/4">
                      <ActionItem actionButton={()=>handleActionToggle(item.id)} name={item.name} icon={item.icon} variant={item?.variant ?? 'solid'} background={item.background} plus={true} />
                  </View>
              ))}
          </View>
        </View>

      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheetActions;

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
