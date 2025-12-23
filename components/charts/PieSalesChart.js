import { useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const PieSalesChart = () => {
  const barData = [
    { value: 250, label: 'Facebook', frontColor: '#0089FF' },
    { value: 500, label: 'Khác', frontColor: '#0089FF' },
    { value: 745, label: 'TMĐT', frontColor: '#0089FF' },
    { value: 320, label: 'Google', frontColor: '#0089FF' },
    { value: 600, label: 'Hotline', frontColor: '#0089FF' },
    { value: 256, label: 'Showroom', frontColor: '#0089FF' },
  ];
  const [chartKey, setChartKey] = useState(0);

  return (
    <View className=""
      // style={{
      //   shadowColor: "#000",
      //   shadowOpacity: 0.2,
      //   shadowRadius: 8,
      //   elevation: 5,
      // }}
    >
      <View
        className="py-5 bg-white rounded-xl"
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          paddingVertical: 16,
          // Shadow cho iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          // Shadow cho Android
          elevation: 6,
        }}
      >
        <Text className="px-5 font-medium text-f14 mb-3 uppercase">
          Doanh thu bán hàng chi tiết trong năm 1
        </Text>

        {/* Dùng margin cho chart thay vì padding cha */}
        <View className='px-3 mt-7' style={{ borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1 }}>
          <BarChart
            key={chartKey}
            data={barData}
            barWidth={18}
            height={200}
            width={290}
            minHeight={3}
            barBorderRadius={3}
            // showGradient
            // frontColor={transactionType === "Expense" ? "#dc2626" : "#4f46e5"}
            // gradientColor={transactionType === "Expense" ? "#ea580c" : "#7c3aed"}
            spacing={35}
            noOfSections={4}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLabelsVerticalShift={2}
            xAxisLabelTextStyle={{ color: "gray" }}
            yAxisTextStyle={{ color: "gray" }}
            isAnimated
            animationDuration={300}
            // rulesColor={"#00000020"}
            // backgroundColor={"white"}
            // showGradient
            // gradientColor={"blue"}
          // barInnerComponent={() => (
          //   <View style={{ backgroundColor: "pink", height: "100%" }} />
          // )}
          // showLine
          // dashGap={0}
          // dashWidth={0}
          />
        </View>
      </View>
    </View>
  );
};

export default PieSalesChart;
