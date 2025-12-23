import React from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";

const BarHomeChart = () => {
  const screenWidth = Dimensions.get("window").width;
  const chartHeight = 240; //240

  const barData = [
    { value: 80, label: "Hà Nội", color: "#ef4444" },
    { value: 95, label: "HCM", color: "#ef4444" },
    { value: 65, label: "Đà Nẵng", color: "#ef4444" },
    { value: 50, label: "Hải Phòng", color: "#ef4444" },
    { value: 40, label: "Cần Thơ", color: "#ef4444" },
    { value: 30, label: "Khác", color: "#ef4444" },
    { value: 45, label: "Online", color: "#ef4444" },
  ];

  const numberOfBars = barData.length;
  const spacing = 15;
  const barWidth = (screenWidth - spacing * (numberOfBars + 4)) / numberOfBars;
  const maxValue = Math.max(...barData.map((b) => b.value));

  return (
    <View>
      <View className="mb-3 px-4 hidden">
        <Text className="text-[20px] font-sfmedium">Doanh thu bán hàng</Text>
        <Text className="text-gray-500 mt-1 text-[12px]">
          Cập nhật lúc 17:30 20/01/2025
        </Text>
      </View>

      <Svg height={chartHeight} width={screenWidth}>
        {barData.map((item, index) => {
          const barHeight = (item.value / maxValue) * (chartHeight - 30); //. - 60
          const x = spacing + index * (barWidth + spacing);
          const y = chartHeight - barHeight - 0; // -40

          return (
            <React.Fragment key={index}>
              {/* Cột */}
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={8}
                fill={item.color}
              />

              {/* Label giá trị */}
              <SvgText
                x={x + barWidth / 2}
                y={y - 5}
                fontSize="12"
                fill="#111827"
                fontWeight="bold"
                textAnchor="middle"
              >
                {item.value}%
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
      {/* Legend - chú giải */}
      <View
        className={`flex-row flex-wrap justify-center pt-3 gap-x-4 gap-y-2 ${Platform.OS=='android'?'gap-y-1':''} px-3`}
      >
        {barData.map((item, index) => (
          <View
            key={index}
            className='flex-row items-center'
          >
            <View
              style={{
                backgroundColor: item.color,
              }}
              className='w-[10px] h-[10px] rounded-full mr-[6px]'
            />
            <Text style={{ color: "#374151", fontSize: 13 }}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BarHomeChart;
