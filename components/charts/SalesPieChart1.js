import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

const screenWidth = Dimensions.get('window').width;

// Dữ liệu
const pieData = [
  { label: 'Hà Nội', value: 54.5, color: '#009FFF', gradientColor: '#006DFF' },
  { label: 'Hồ Chí Minh', value: 24.5, color: '#93FCF8', gradientColor: '#3BE9DE' },
  { label: 'Tỉnh/Công ty', value: 0, color: '#BDB2FA', gradientColor: '#8F80F3' },
  { label: 'Sàn TMĐT', value: 14, color: '#FFA5BA', gradientColor: '#FF7F97' },
  { label: 'Không tiềm năng', value: 5, color: '#FFD700', gradientColor: '#FFC300' },
  { label: 'Black list/Chặn', value: 2, color: '#00C49F', gradientColor: '#008080' },
];

const renderLegendItem = ({ item }) => (
  <View className="flex-row flex-wrap mb-3" key={item.label}>
    <View
      className="w-3 h-3 rounded-full mr-2 mt-1"
      style={{ backgroundColor: item.color }}
    />
    <Text className="text-f13 flex-1 flex-shrink">{`${item.label}: ${item.value}%`}</Text>
  </View>
);

const SalesPieChart1 = () => {
  const chartData = pieData.map(item => ({
    value: item.value,
    color: item.color,
    gradientCenterColor: item.gradientColor,
    focused: item.focused,
  }));

  const focusedItem = pieData.find(item => item.focused) || pieData[0];

  return (
    <View 
    style={{
        backgroundColor: "white",
        borderRadius: 10,
        // paddingVertical: 16,
        // Shadow cho iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Shadow cho Android
        elevation: 6,
    }}
    className='flex-1 w-full h-full bg-white px-5'>
      <Text className='font-bold pt-8 text-f17'>Doanh thu bán hàng chi tiết trong năm</Text>
      <View className='flex-row'>
        {/* Biểu đồ */}
        <View className='mt-10'>
          <PieChart
            data={chartData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'transparent'} // Màu sắc Background của Box Pie
            centerLabelComponent={() => (
              <View className='text-center'>
                <Text className='font-bold text-center text-f15 text-white'>{focusedItem.value}%</Text>
                <Text className='font-bold text-f14 text-white'>{focusedItem.label}</Text>
              </View>
            )}
          />
        </View>

        {/* Thông tin của biểu đồ */}
        <View className='pl-5 mt-14 flex-1'>
            <FlatList
              data={pieData}
              renderItem={renderLegendItem}
              keyExtractor={(item) => item.label}
              scrollEnabled={true} // tắt scroll nếu bạn chỉ muốn hiển thị cố định
            />
        </View>
      </View>
      <TouchableOpacity className='flex-row items-center justify-between mt-7 hidden'>
        <Text className='font-medium text-f17'>Danh sách đơn hàng hôm nay</Text>
        <ChevronRightIcon size={18} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default SalesPieChart1;
