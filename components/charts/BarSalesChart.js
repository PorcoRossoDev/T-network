import React from "react";
import { View, Platform } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const BarSalesChart = () => {
  const barData = [
    { value: 80, label: "Hà Nội", frontColor: "#EF4444" },
    { value: 95, label: "HCM", frontColor: "#EF4444" },
    { value: 65, label: "Đà Nẵng", frontColor: "#EF4444" },
    { value: 50, label: "Hải Phòng", frontColor: "#EF4444" },
    { value: 40, label: "Cần Thơ", frontColor: "#EF4444" },
    { value: 30, label: "Khác", frontColor: "#EF4444" },
    { value: 45, label: "Online", frontColor: "#EF4444" },
  ];


  return (
    <View className='overflow-hidden px-2'>
      <BarChart
        data={barData}
        height={200}
        barWidth={Platform.OS === "ios" ? 35 : 30}
        spacing={15}
        initialSpacing={15}
        noOfSections={4}
        minHeight={3}
        xAxisColor="#ddd"
        yAxisColor="#ddd"
        xAxisLabelTextStyle={{ color: "gray", fontSize: 12 }}
        yAxisTextStyle={{ color: "gray", fontSize: 12 }}
        isAnimated
        animationDuration={300}
      />
    </View>
  );
};

export default BarSalesChart;
