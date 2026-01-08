import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

// forwardRef cho phép parent gọi ref.present()
const BottomSheetLearnMore = forwardRef((props, ref) => {
  const { snapPoints = ['70%'], onClose } = props;

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

  const ListView = [
    [
      'Base Human Hash Power (HHP)',
      'Mỗi người dùng bắt đầu với Base HHP là 1.0.'
    ],
    [
      'Giới thiệu trực tiếp (F1)',
      'Nhận 500 $ITLG và 0.2 HHP cho mỗi bạn bè mời được — chỉ khi họ đã khai thác $ITLG trong 24 giờ gần nhất.'
    ],
    [
      'Giới thiệu gián tiếp (F2)',
      'Nhận 250 $ITLG và 0.1 HHP cho mỗi người được bạn bè của bạn mời — chỉ khi họ hoạt động.'
    ],
    [
      'Nhập mã giới thiệu',
      'Nhận thêm 0.5 HHP khi bạn nhập mã giới thiệu.'
    ],
    [
      'Không giới hạn',
      'Bạn không bị giới hạn số người có thể mời trực tiếp và số người mời gián tiếp.'
    ],
    [
      'Tổng Human Hash',
      'Tổng HHP của bạn = Base + Thưởng giới thiệu (F1, F2, mã).'
    ],
    [
      'HHP hoạt động hôm nay',
      'Đây là lượng HHP thực sự được tính hôm nay dựa trên các người được mời đang hoạt động. Những người được mời không hoạt động sẽ không được tính.'
    ],
    [
      'Tỷ lệ khai thác thay đổi',
      'Base Rate = 1 (nếu HHP ≤ 10)\nBase Rate = 1 / log₁₀(HHP + e) (nếu HHP > 10)'
    ],
    [
      'Khai thác $ITLG hằng ngày',
      'Cứ mỗi 4 giờ, phần thưởng của bạn = 20 × HHP hoạt động hôm nay × Base Rate.'
    ]
  ]

  const exampleList = [
    'Bạn mời 2 người bạn. Cả hai đều hoạt động → 0.2 × 2 = 0.4 HHP.',
    'Một trong hai người đó mời thêm 1 người hoạt động → +0.1 HHP.',
    'Bạn nhập mã giới thiệu → +0.5 HHP.',
    'Tổng HHP: 1.0 (base) + 0.4 (F1) + 0.1 (F2) + 0.5 (mã) = 2.0 HHP.',
    'Nếu HHP ≤ 10 → Base Rate = 1 → Thưởng mỗi 4 giờ = 20 × 2.0 × 1 = 40 $ITLG.',
    'Nếu HHP = 15 → Base Rate ≈ 0.8 → Thưởng mỗi 4 giờ = 20 × 2.0 × 0.8 = ~240 $ITLG.',
  ];

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
      <BottomSheetScrollView showsVerticalScrollIndicator={false} className="bg-white">
        <View className="px-4 pb-7">
          <View className="relative">
            <TouchableOpacity onPress={onClose} className="absolute left-0 w-6 h-6 border border-gray-400 justify-center items-center rounded-full">
              <MaterialIcons name="close" size={18} color="black" />
            </TouchableOpacity>
            <View className="flex-row justify-center items-center">
                <View className="w-6 h-6 border bg-black justify-center items-center rounded-full">
                  <FontAwesome6 name="book-open" size={12} color="white" />
                </View>
                <Text className="ml-2 font-sgbold text-f18">Cơ chế Human Hash</Text>
            </View>
          </View>

          {/* Tổng quan */}
          <View className="mt-8">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="sale" size={20} color="black" />
              <Text className="ml-1 text-f15 font-sgmedium">Tổng quan</Text>
            </View>
            <View>
              <View className="mt-3 bg-gray-200 p-4 rounded-xl">
                <Text className="font-sgregular">
                  Cơ chế này giải thích cách bạn có thể kiểm được sức mạnh Human Hash (HHP)
                  và phần thưởng $ITLG bằng cách mời bạn bè tham gia Interlink. Tìm hiểu quy tắc và xem cách tình phần
                  thưởng $ITLG hằng ngày của bạn!
                </Text>
              </View>
              <View className="mt-3 bg-yellow-100 border border-yellow-300 p-4 rounded-xl flex-row">
                <View className="flex-1">
                  <MaterialCommunityIcons
                    name="information-variant-circle-outline"
                    size={17}
                    color="#ea580c"
                  />
                </View>
                <View className="w-[94%]">
                  <Text className="font-sgregular">
                    Cơ chế này giải thích cách bạn có thể kiểm được sức mạnh Human Hash (HHP)
                    và phần thưởng $ITLG bằng cách mời bạn bè tham gia Interlink. Tìm hiểu quy tắc và xem cách tình phần
                    thưởng $ITLG hằng ngày của bạn!
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Cách tính */}
          <View className="mt-5">
            <View className="flex-row items-center">
              <Ionicons name="calculator" size={20} color="black" />
              <Text className="ml-1 text-f15 font-sgmedium">Cách tính thường Human Hash cum</Text>
            </View>
            <View>
              {
                ListView.map((item, index) => {
                  return (
                    <View key={index} className="mt-3 bg-gray-200 p-4 rounded-xl flex-row">
                      <View className="flex-1">
                        <Text className="font-medium text-f14">{index+1}.</Text>
                      </View>
                      <View className="w-[94%]">
                        {
                          item.map((text, indexT) => {
                            return (
                              <Text className="font-sgregular" key={indexT}>{text}</Text>
                            )
                          })
                        }
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>

          {/* Ví dụ */}
          <View className="mt-5">
            <View className="flex-row items-center">
              <FontAwesome name="file-text" size={20} color="black" />
              <Text className="ml-1 text-f15 font-sgmedium">Ví dụ minh hoạ</Text>
            </View>
            <View>
              <View className="mt-3 rounded-xl">
                <LinearGradient
                  colors={['#EAF6FF', '#F1EEFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                  }}
                >
                  <View className="py-5 px-5">
                    <View className="flex-row items-center justify-center">
                      <View className="w-5 h-5 bg-black items-center justify-center rounded-full">
                        <Fontisto name="star" size={10} color="white" />
                      </View>
                      <Text className="ml-1.5 text-f15 font-sgmedium">Cùng xem ví dụ cụ thể</Text>
                    </View>

                    <View className="bg-white rounded-xl p-4 mt-4">
                      {
                        exampleList.map((item, index) => {
                          return (
                            <View key={index} className="flex-row mb-2">
                              <Text className="text-gray-500">•</Text>
                              <Text key={index} className="pl-1 text-gray-500 font-sgregular">{item}</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default BottomSheetLearnMore;

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
