import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const CustomerLineChart = () => {
  const data = [
    { label: '16/09', value: 42 },
    { label: '17/09', value: 58 },
    { label: '18/09', value: 63 },
    { label: '19/09', value: 71 },
    { label: '20/09', value: 49 },
    { label: '21/09', value: 82 },
    { label: '22/09', value: 38 },
    { label: '23/09', value: 55 },
    { label: '24/09', value: 67 },
    { label: '25/09', value: 74 },
    { label: '26/09', value: 80 },
    { label: '27/09', value: 52 },
    { label: '28/09', value: 91 },
    { label: '29/09', value: 44 },
    { label: '30/09', value: 66 },
    { label: '01/10', value: 73 },
    { label: '02/10', value: 57 },
    { label: '03/10', value: 62 },
    { label: '04/10', value: 84 },
    { label: '05/10', value: 49 },
    { label: '06/10', value: 77 },
    { label: '07/10', value: 68 },
    { label: '08/10', value: 55 },
    { label: '09/10', value: 92 },
    { label: '10/10', value: 59 },
    { label: '11/10', value: 63 },
    { label: '12/10', value: 78 },
    { label: '13/10', value: 83 },
    { label: '14/10', value: 69 },
    { label: '15/10', value: 75 },
  ];

  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 36; // trừ padding

  return (
    <View className=''>
      <Text className='text-f16 font-sfmedium text-center'>Tăng trưởng đơn hàng trong tháng này</Text>
      <View style={{ overflow: 'visible', width: '100%' }}>
        <BarChart
          initialSpacing
          data={data}
          barWidth={20}
          spacing={10}
          frontColor="#2563eb"
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          isAnimated
          barBorderRadius={4}
          hideYAxisText
          xAxisLabelTextStyle={{
            fontSize: 10,
            // backgroundColor: 'red',
            color: "#000",
            marginTop: 6,              // tránh bị cắt
            transform: [{ rotate: '-60deg' }], // nghiêng label
            // textAlign: 'right',
            textAnchor: 'end',
            alignmentBaseline: 'middle',
          }}
          // xAxisLabelsHeight={70}         // tăng chiều cao vùng label
          width={chartWidth}
        />
      </View>
    </View>
  );
};

export default CustomerLineChart;
