import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import BottomSheet from "../../../components/common/BottomSheet";

const data = {
  title: "Phí ship GHTK -1x Tinh dầu Oasis Hotel 50ml ngày 13/11 (PC131125-044)",
  amount: "32.500 đ",
  name: "Phí ship GHTK -1x Tinh dầu Oasis Hotel 50ml ngày 13/11",
  createdAt: "13/11/2025",
  schedule: "Một lần",
  createdBy: "Phạm Phương Thúy",
  note: "-1x Tinh dầu Oasis Hotel 50ml 0917915455_GHTK_32.500k",
};

const timelineSteps = [
  { title: "Tạo phiếu chi", time: "15:55 13/11/2025", status: "done" },
  { title: "Duyệt phiếu chi", time: "16:10 13/11/2025", status: "done" },
  { title: "Hoàn thành", time: null, status: "pending" },
  { title: "Huỷ", time: null, status: "canceled" },
];

const history = [
  { time: "15:55 13/11/2025", title: "Tạo phiếu chi mới bởi Phạm Phương Thúy" },
  { time: "16:10 13/11/2025", title: "Phiếu chi đã được duyệt" },
  { time: "16:10 13/11/2025", title: "Phiếu chi đã được duyệt bởi Admin" },
];

const DisbursementDetailStack = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([
    { id: 1, url: "https://placekitten.com/300/300" },
    { id: 2, url: "https://placekitten.com/301/300" },
    { id: 3, url: "https://placekitten.com/302/300" },
    { id: 4, url: "https://placekitten.com/303/300" },
  ]);
  const [note, setNote] = useState("");
  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  // Thông tin phần Modal
  const [sheetContent, setSheetContent] = useState(null);
  const bottomSheetRef = useRef(null);

  const openSheetWithContent = (content) => {
    setSheetContent(content);         // set nội dung trước
    setTimeout(() => {
      bottomSheetRef.current?.present();  // gọi present sau khi render
    }, 0);
  };
  const closeSheet = () => bottomSheetRef.current?.dismiss();

  const SuccessDisbursement = () => {
    return (
      <View className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm mt-4">
        <View className="flex-row items-center gap-2">
          <Text className="text-gray-800 font-medium">📄 Thông tin hoàn thành phiếu chi</Text>
          <TouchableOpacity onPress={() => openSheetWithContent(<ViewImage />)}>
            <Text className="text-blue-600 text-base">
              <HeroOutline.PencilSquareIcon
                size={17}
                color='#000'
                style={{ transform: [{ translateY: 0 }] }}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row justify-start items-start'>
          <TouchableOpacity
            onPress={() => openSheetWithContent(<ListImage />)}
            className="mt-3 bg-blue-600 px-3 py-2 rounded-lg"
          >
            <Text className="text-white"><HeroOutline.PhotoIcon color='#fff' size='18' style={{ transform: [{ translateY: 4 }] }} /> Xem hình ảnh (1)</Text>
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          onClose={closeSheet}
        >
          {sheetContent}
        </BottomSheet>
      </View>
    )
  }

  // Modal Content hiển thị upload hình ảnh & ghi chú
  const ViewImage = () => {
    return (
      <View className="w-full px-5">
        <Text className="text-lg font-semibold mb-3">Hoàn thành phiếu chi</Text>

        {/* Ghi chú */}
        <Text className="text-gray-600 mb-1">Ghi chú</Text>
        <TextInput
          placeholder="Nhập ghi chú..."
          className="border border-gray-300 rounded-xl p-3 h-24 mb-4"
          multiline
        />

        {/* Image upload */}
        <Text className="text-red-500 mb-1">* Hình ảnh</Text>

        <View className="flex-row">
          {/* Existing image */}
          <View className="w-20 h-20 bg-gray-200 rounded-lg mr-3 overflow-hidden">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              className="w-full h-full"
            />
          </View>

          {/* Upload box */}
          <TouchableOpacity
            className="w-20 h-20 border border-gray-300 rounded-lg justify-center items-center"
          >
            <Text className="text-xl">＋</Text>
            <Text className="text-gray-600 text-xs mt-1">Tải ảnh</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-400 text-xs mt-2">
          Tối đa 10 ảnh, mỗi ảnh không quá 5MB. Định dạng: JPG, PNG, GIF
        </Text>

        {/* Buttons */}
        <View className="flex-row justify-end mt-5 gap-3">
          <TouchableOpacity
            className="px-4 py-2 rounded-xl bg-gray-200"
            onPress={() => onClose()}
          >
            <Text className="text-gray-800">Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity className="px-4 py-2 rounded-xl bg-blue-600">
            <Text className="text-white">Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const ListImage = () => {
    return (
      <View className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold mb-4">Danh sách hình ảnh</Text>

        <FlatList
          data={images}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mb-4 bg-gray-100 rounded-xl overflow-hidden w-[48%]"
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.url }}
                className="w-full h-40 rounded-xl"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  return (
    <ScrollView className='bg-white p-5'>

      {/* TITLE */}
      <Text className="text-f18 font-sfbold text-black mb-4">
        {data.title}
      </Text>

      {/* ACTION BUTTON ROW */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity className="flex-1 bg-blue-500 py-2 rounded-lg items-center mr-2">
          <Text className="text-white font-semibold">In phiếu chi</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 border border-blue-500 py-2 rounded-lg items-center mr-2">
          <Text className="text-blue-500 font-semibold">Duyệt phiếu chi</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-gray-200 py-2 rounded-lg items-center">
          <Text className="text-gray-500 font-semibold">Hoàn thành</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-sfbold mb-3">Trạng thái phiếu chi</Text>
      {timelineSteps.map((step, index) => {
        let color =
          step.status === "done"
            ? "text-green-600"
            : step.status === "pending"
              ? "text-gray-400"
              : "text-red-600";

        let dotColor =
          step.status === "done"
            ? "bg-green-500"
            : step.status === "pending"
              ? "bg-gray-300"
              : "bg-red-500";

        return (
          <View key={index} className={`flex-row  ${Platform.OS == 'ios' ? 'mb-4' : 'mb-2'} items-start`}>
            {/* DOT */}
            <View className={`w-3 h-3 rounded-full mt-1 mr-3 ${dotColor}`} />

            {/* CONTENT */}
            <View className="flex-1">
              <Text className={`font-sfmedium text-f15 ${color}`}>{step.title}</Text>

              {step.time ? (
                <Text className={`text-gray-500 font-sfregular ${Platform.OS == 'ios' ? 'mt-0.5' : ''} text-f14`}>{step.time}</Text>
              ) : (
                <Text className="text-gray-400 font-sfregular">Chưa thực hiện</Text>
              )}
            </View>
            <View className='absolute w-[1px] h-full bg-gray-300 top-4 left-1.5' />
          </View>
        );
      })}

      <SuccessDisbursement />

      {/* CARD */}
      <View className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm mt-4">

        <View className="flex-row mb-2">
          <Text className="w-28 font-semibold text-black">Tên phiếu:</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DisbursementAddStack')} className="flex-1">
            <Text className="font-sfregular">
              {data.name}{' '}
              <HeroOutline.PencilSquareIcon
                size={17}
                style={{ transform: [{ translateY: 2 }] }}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row mb-2">
          <Text className="w-28 font-semibold text-black">Ngày tạo:</Text>
          <Text className='font-sfregular'>{data.createdAt}</Text>
        </View>

        <View className="flex-row mb-2">
          <Text className="w-28 font-semibold text-black">Lập lịch:</Text>
          <Text className='font-sfregular'>{data.schedule}</Text>
        </View>

        <View className="flex-row mb-2">
          <Text className="w-28 font-semibold text-black">Tạo bởi:</Text>
          <Text className='font-sfregular'>{data.createdBy}</Text>
        </View>

        <View className="flex-row mt-3">
          <Text className="w-28 font-semibold text-black">Ghi chú:</Text>
          <Text className="text-red-600 font-sfbold flex-1">{data.note}</Text>
        </View>
      </View>

      {/* TIMELINE */}
      <View className="mt-5 p-4 rounded-xl border border-gray-200 bg-white shadow-sm mb-10">
        <Text className="font-sfbold text-f15 mb-4">Lịch sử trạng thái</Text>

        {history.map((h, i) => (
          <View key={i} className="flex-row items-start mb-4 relative">
            <View className="w-2 h-2 bg-green-500 rounded-full mt-1 mr-3" />
            <View>
              <Text className="font-semibold">{h.time}</Text>
              <Text className="text-gray-600 font-sfregular mt-1">{h.title}</Text>
            </View>
            <View className='absolute w-[1px] h-full bg-gray-300 top-3 left-1' />
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#f3f4f6',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: 'sfbold',
  },
  selectedText: {
    fontSize: 14,
    color: '#000',
    width: '90%', // cắt khi dài quá
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#374151',
  },
});

export default DisbursementDetailStack