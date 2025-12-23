import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const RoundedSegmentsChart = () => {
  const radius = 80;
  const strokeWidth = 16;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { color: '#FF4F79', value: 0.15 },
    { color: '#A66BFF', value: 0.1 },
    { color: '#FFD166', value: 0.08 },
    { color: '#9EE493', value: 0.15 },
    { color: '#5AC8FA', value: 0.18 },
    { color: '#FF9F1C', value: 0.1 },
    { color: '#C4C4C4', value: 0.08 },
  ];

  let currentOffset = 0;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={center * 2} height={center * 2}>
        {segments.map((s, i) => {
          const dashLength = circumference * s.value * 0.9; // 90% segment, 10% gap
          const gapLength = circumference * s.value * 0.1;
          const offset = circumference * currentOffset;
          currentOffset += s.value;

          return (
            <Circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              stroke={s.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${gapLength}`}
              strokeDashoffset={-offset}
              strokeLinecap="round" // 👈 Bo tròn hai đầu
              fill="none"
            />
          );
        })}
      </Svg>

      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 14, color: '#007AFF', fontWeight: '600' }}>
          UNPAID INVOICES
        </Text>
        <Text style={{ fontSize: 22, fontWeight: '700', color: 'white' }}>
          $156,703.01
        </Text>
      </View>
    </View>
  );
};

export default RoundedSegmentsChart;