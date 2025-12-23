import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const PieHomeChart = ({ pieData, title, isShowSubtitle = false }) => {
  const total = useMemo(
    () => pieData.reduce((sum, i) => sum + i.value, 0),
    [pieData]
  );
  const chartData = useMemo(
    () =>
      pieData.map((i) => ({
        value: i.value,
        color: i.color,
        text: `${Math.round((i.value / total) * 100)}%`,
      })),
    [pieData, total]
  );

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View className="mb-3 px-4">
        <Text className="text-[20px] font-medium uppercase">{title}</Text>
        {isShowSubtitle && (
          <Text className="text-gray-500 mt-1 text-[12px]">
            Cập nhật lúc {new Date().toLocaleString()}
          </Text>
        )}
      </View>

      <View className="items-center my-2">
        <PieChart
          data={chartData}
          donut
          radius={90}
          innerRadius={0}
          showText
          textColor="#111827"
          textSize={11}
          focusOnPress
          sectionAutoFocus
          tiltAngle={0}
        />
      </View>

      <View className="flex-row flex-wrap justify-center items-center mt-4 gap-2">
        {pieData.map((item, index) => {
          const pct = Math.round((item.value / total) * 100);
          return (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: item.color,
                  marginRight: 6,
                }}
              />
              <Text style={{ color: "#374151", fontSize: 13 }}>
                {item.label} • {pct}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PieHomeChart;
