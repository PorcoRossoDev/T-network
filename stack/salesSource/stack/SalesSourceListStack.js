import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import { useSharedValue } from "react-native-reanimated";
import ColorPicker, {
  BrightnessSlider,
  InputWidget,
  OpacitySlider,
  Panel2,
  colorKit,
} from "reanimated-color-picker";
// import SalesSourceItem from '../../../components/salesSource/SalesSourceItem';

const SalesSourceItem = ({ openModal, color }) => {
  return (
    <View className="flex-row justify-between mb-5 pb-5 ptext-f16  border-b items-start border-gray-200">
      <View className="items-center justify-items-start bg-gray-100 flex-row">
        <Text className="font-sfmedium text-f15 text-left">Khác</Text>
      </View>
      <View
        className="rounded-lg justify-center items-center px-2 py-1 font-sfregular"
        style={{ backgroundColor: color }}
      >
        <Text className="text-white">{color}</Text>
      </View>
      <View className="">
        <View className="flex-row flex-wrap gap-x-1.5">
          <TouchableOpacity
            onPress={() => openModal(color)}
            className="border rounded-md p-1"
          >
            <HeroOutline.PencilIcon size={15} color={"#333"} />
          </TouchableOpacity>
          <TouchableOpacity className="border border-red-600 rounded-md p-1">
            <HeroOutline.TrashIcon size={15} color={"#dc2626"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SalesSourceListStack = ({ navigation }) => {
  const initialColor = colorKit.randomRgbColor().hex();
  const [resultColor, setResultColor] = useState(initialColor);
  const currentColor = useSharedValue(initialColor);

  const onColorChange = (color) => {
    "worklet";
    currentColor.value = color.hex;
  };

  const onColorPick = (color) => {
    setResultColor(color.hex);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const openModal = (color) => {
    setResultColor(color);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 bg-white">
        <View className="mt-6">
          <View className="mt-4 space-y-2">
            <SalesSourceItem openModal={openModal} color={"#707070"} />
            <SalesSourceItem openModal={openModal} color={"#0089FF"} />
            <SalesSourceItem openModal={openModal} color={"#dc2626"} />
          </View>
        </View>
      </ScrollView>

      {/* Modal chỉnh sửa */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.4)]">
          <View className="bg-white w-[80%] rounded-lg overflow-hidden">
            <View className="px-3 py-3">
              <Text className="text-center font-sfbold mb-4 text-f17 mt-2">
                Cập nhật chính sách giá
              </Text>

              {/* Tên chính sách */}
              <View>
                <Text className="text-red-600 font-sfregular">
                  *{" "}
                  <Text className="text-gray-500 font-sfregular">
                    Tên chính sách giá
                  </Text>
                </Text>
                <TextInput
                  value="Đơn giao xa"
                  className="border-b border-gray-200 py-2 font-sfregular text-f15"
                />
              </View>

              {/* Màu sắc */}
              <View className="mt-4">
                <Text className="text-red-600 font-sfregular">
                  *{" "}
                  <Text className="text-gray-500 font-sfregular">Màu sắc</Text>
                </Text>
                <View className="flex-row items-end gap-x-3">
                  <TouchableOpacity
                    onPress={() => setColorPickerVisible(true)}
                    className="w-10 h-7 rounded"
                    style={{ backgroundColor: resultColor }}
                  />
                  <TextInput
                    value={resultColor}
                    className="flex-1 border-b border-gray-200 py-2 font-sfregular text-f15"
                  />
                </View>
              </View>

              <View>
                <KeyboardAvoidingView behavior="position">
                  <View
                    className="self-center w-full bg-white rounded-2xl px-1 mt-6"
                    // style={{
                    //   shadowColor: '#000',
                    //   shadowOffset: { width: 0, height: 5 },
                    //   shadowOpacity: 0.34,
                    //   shadowRadius: 6.27,
                    //   elevation: 10,
                    // }}
                  >
                    <ColorPicker
                      value={resultColor}
                      sliderThickness={25}
                      thumbSize={30}
                      thumbShape="rect"
                      onChange={onColorChange}
                      onCompleteJS={onColorPick}
                      style={{ gap: 20 }}
                    >
                      <Panel2
                        thumbShape="ring"
                        reverseVerticalChannel
                        className="rounded-xl shadow-md"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                      />
                      <BrightnessSlider className="rounded-xl shadow-md" />
                      <OpacitySlider className="rounded-xl shadow-md" />
                      <InputWidget
                        inputStyle={{
                          color: "#707070",
                          paddingVertical: 2,
                          borderColor: "#707070",
                          fontSize: 12,
                          marginLeft: 5,
                        }}
                        iconColor="#707070"
                      />
                    </ColorPicker>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </View>

            <View className="flex-row border-t border-gray-300">
              <Pressable
                className="w-1/2 justify-center border-r border-gray-300"
                onPress={closeModal}
              >
                <Text className="text-center text-blue-600 py-4 text-f15 font-sfmedium">
                  Thoát
                </Text>
              </Pressable>
              <Pressable className="flex-1" onPress={closeModal}>
                <Text className="text-center text-blue-600 py-4 text-f15 font-sfmedium">
                  Cập nhật
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SalesSourceListStack;
