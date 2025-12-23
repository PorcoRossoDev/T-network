// ⚠️ PHẢI import reanimated đầu tiên
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';
import ColorPicker, { Panel2 } from 'reanimated-color-picker';

export default function ColorTest() {
  const [selectedColor, setSelectedColor] = useState('#3498db');

  // Sự kiện khi chọn màu
  const onColorChange = useCallback(({ hex }) => {
    setSelectedColor(hex);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>
        Chọn màu sắc
      </Text>

      {/* Khung hiển thị picker */}
      <View
        style={{
          width: 300,
          borderRadius: 16,
          backgroundColor: '#f9f9f9',
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}>
        <ColorPicker
        value={selectedColor}
        onChange={onColorChange}
        disableAnimation
        >
        {/* <Preview /> */}
        <Panel2 />
        {/* <HueSlider /> */}
        </ColorPicker>

      </View>

      {/* Nút hiển thị màu đã chọn */}
      <TouchableOpacity
        style={{
          marginTop: 30,
          backgroundColor: selectedColor,
          paddingHorizontal: 40,
          paddingVertical: 12,
          borderRadius: 8,
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {selectedColor.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
