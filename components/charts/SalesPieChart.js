import { Platform, StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-native-gifted-charts';
// import { PieChart } from 'react-native-svg-charts';
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';


import ProgressBar from '../common/ProgressBar';


// import Svg, { Circle } from 'react-native-svg';


const SalesPieChart = () => {
    // const pieData = [
    //     { label: "Hà Nội", value: 20, color: "#E0F2FF" }, // xanh rất nhạt
    //     { label: "Hồ Chí Minh", value: 22, color: "#B3E5FF" }, // xanh nhạt
    //     { label: "Tỉnh/Công ty", value: 16, color: "#80D4FF" }, // xanh nhẹ
    //     { label: "Không có tiềm năng", value: 18, color: "#4DC3FF" }, // xanh sáng
    //     { label: "Sàn TMĐT", value: 10, color: "#1AB1FF" }, // xanh đậm hơn
    //     { label: "Black List/Chặn", value: 10, color: "#008CFF" }, // xanh biển đậm
    // ];

    // const pieData = [
    // { label: "Hà Nội", value: 20, color: "#FFE0E0", gradientColor: "#FFB3B3" },
    // { label: "Hồ Chí Minh", value: 22, color: "#FFB3B3", gradientColor: "#FF8080" },
    // { label: "Tỉnh/Công ty", value: 16, color: "#FF8080", gradientColor: "#F25555" },
    // { label: "Không có tiềm năng", value: 18, color: "#F25555", gradientColor: "#E43A3A" },
    // { label: "Sàn TMĐT", value: 10, color: "#E43A3A", gradientColor: "#D63238" },
    // { label: "Black List/Chặn", value: 10, color: "#C9252B", gradientColor: "#A51F25" },
    // ];


    // const pieData = [
    //     { label: "Hà Nội", value: 20, color: "#FFE8E8", gradientColor: "#FFD6D6" }, // đỏ sữa
    //     { label: "Hồ Chí Minh", value: 22, color: "#FFC1C1", gradientColor: "#FFA8A8" }, // hồng nhạt
    //     { label: "Tỉnh/Công ty", value: 16, color: "#FF9999", gradientColor: "#FF7B7B" }, // hồng đào
    //     { label: "Không có tiềm năng", value: 18, color: "#F96C6C", gradientColor: "#F25555" }, // đỏ coral
    //     { label: "Sàn TMĐT", value: 10, color: "#E95C5C", gradientColor: "#DD4343" }, // đỏ trầm
    //     { label: "Black List/Chặn", value: 10, color: "#C94747", gradientColor: "#A83B3B" }, // đỏ đất
    // ];

    // const pieData = [
    //     { label: "Hà Nội", value: 20, color: "#FFF0F0", gradientColor: "#FFD6D6" },
    //     { label: "Hồ Chí Minh", value: 22, color: "#FFD6D6", gradientColor: "#FFB3B3" },
    //     { label: "Tỉnh/Công ty", value: 16, color: "#FFB3B3", gradientColor: "#FF8C8C" },
    //     { label: "Không có tiềm năng", value: 18, color: "#FF8C8C", gradientColor: "#F26A6A" },
    //     { label: "Sàn TMĐT", value: 10, color: "#F26A6A", gradientColor: "#E45555" },
    //     { label: "Black List/Chặn", value: 10, color: "#D94A4A", gradientColor: "#C13C3C" },
    // ];

    // const pieData = [
    // { label: "Hà Nội", value: 20, color: "#FFB3B3", gradientColor: "#FF8080" },
    // { label: "Hồ Chí Minh", value: 22, color: "#FF8080", gradientColor: "#FF6666" },
    // { label: "Tỉnh/Công ty", value: 16, color: "#FF6666", gradientColor: "#FF4D4D" },
    // { label: "Không có tiềm năng", value: 18, color: "#FF4D4D", gradientColor: "#E63946" },
    // { label: "Sàn TMĐT", value: 10, color: "#E63946", gradientColor: "#CC2E35" },
    // { label: "Black List/Chặn", value: 10, color: "#CC2E35", gradientColor: "#B02525" },
    // ];

    const pieData = [
    { label: "Hà Nội", value: 20, color: "#FFD6D6" }, // đỏ hồng nhạt
    { label: "Hồ Chí Minh", value: 22, color: "#FFB3B3" }, // đỏ nhạt tươi
    { label: "Tỉnh/Công ty", value: 16, color: "#FF8A80" }, // đỏ sáng
    { label: "Không có tiềm năng", value: 18, color: "#F44336" }, // đỏ tiêu chuẩn
    { label: "Sàn TMĐT", value: 10, color: "#D32F2F" }, // đỏ đậm
    { label: "Black List/Chặn", value: 10, color: "#9A0007" }, // đỏ đô
    ];

    const renderDot = (color) => (
        <View className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: color }} />
    );

    const renderLegendItem = ({ label, color, value }) => (
        // <View key={label} className='w-1/2 px-3 mt-4'>
        //     <View className="flex-row items-center">
        //         <Text className="text-f13 font-sfmedium text-gray-700">{`${label}`}</Text>
        //         <View className="w-[1px] h-3 bg-gray-300 mx-2" />
        //         <Text className="text-f13 text-gray-700">{`${value}%`}</Text>
        //     </View>
        //     <ProgressBar progress={value} color={color} />
        // </View>

        <View key={label} className={`w-1/2 px-3 relative mt-5 ${Platform.OS === 'android' ? 'mt-4' : 'mt-6'}`}>
            <View className={`flex-row items-center ${Platform.OS === 'ios' ? 'mb-1' : 'mt-0'}`}>
                <Text className="text-f13 font-sfregular">{`${label}`}</Text>
                <View className="w-[1px] h-4 bg-gray-300 mx-2" />
                <Text className="text-f13 text-gray-700">{`${value}%`}</Text>
            </View>
            <ProgressBar progress={value} color={color} />
        </View>
    );

    // Start
    const rings = [
        { color: '#177AD5', progress: 0.7 },
        { color: '#79D2DE', progress: 0.5 },
        { color: '#ED6665', progress: 0.3 },
    ];

    const size = 200;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    // End

    // Thời gian
    const times = [
        { label: 'Năm nay', value: '0' },
        { label: '6 Tháng', value: '1' },
        { label: 'Tháng này', value: '2' },
    ];
    const [value, setValue] = useState('0');
    const [isFocus, setIsFocus] = useState(false);
    const [selected, setSelected] = useState("");

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
            className=' rounded-xl bg-white mb-4'>
            <View
                className="rounded-xl px-5 pb-5 pt-3 bg-white"
            >
                <View className='flex-row justify-between items-center mb-4'>
                    <Text className="font-sfbold text-f20 text-gray-800">
                        Doanh thu bán hàng
                    </Text>
                    <View className='w-1/3'>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={{
                                fontSize: 15,
                                color: '#374151',
                                fontFamily: 'SF-Pro-Display-Regular',
                            }}
                            itemTextStyle={{
                                fontSize: 14,           // ✅ font chữ của các option trong danh sách
                                fontFamily: 'SF-Pro-Display-Regular',
                                color: '#333',
                                // height: 10,
                                padding: 0,
                            }}
                            itemContainerStyle={{
                                paddingVertical: 0,   // 👉 giảm khoảng cách mỗi item
                                minHeight: 0,         // 👉 bỏ chiều cao tối thiểu
                                height: 'auto',       // 👉 để vừa nội dung
                            }}
                            // itemContainerStyle={{ height: 50 }}
                            // inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={times}
                            // search
                            // maxHeight={150}
                            labelField="label"
                            valueField="value"
                            // placeholder={!isFocus ? 'Chọn khách hàng' : '...'}
                            // searchPlaceholder="Chọn khách hàng..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>
                </View>
                <View className='mt-3'>
                    {/* Biểu đồ */}
                    <View className="items-center mb-1">
                        <View className=''>
                            {/* <PieChart
                                data={pieData}
                                donut
                                sectionAutoFocus
                                radius={100}
                                innerRadius={70}
                                sectionSpace={30}
                                isAnimated
                                
                                animationDuration={300}
                                innerCircleColor="#fafafa"
                                centerLabelComponent={() => (
                                <View className="items-center">
                                    <Text className="text-[19px] font-bold">47%</Text>
                                    <Text className="text-[14px]">Excellent</Text>
                                </View>
                                )}
                            /> */}

                            <PieChart
                                data={pieData}
                                donut
                                radius={100}
                                innerRadius={65}
                                sectionSpace={5}               // 👈 tạo khoảng cách giữa các phần
                                strokeWidth={5}              // 👈 tạo đường viền nhẹ giữa phần và nền
                                strokeColor="#fff"
                                showGradient                   // 👈 làm mượt màu các lát
                                isAnimated
                                animationDuration={400}
                                innerCircleColor="#fff"
                                centerLabelComponent={() => (
                                    <View className="items-center">
                                        <Text className="text-[19px] font-bold">47%</Text>
                                        <Text className="text-[14px] text-gray-500">Excellent</Text>
                                    </View>
                                )}
                            />

                            {/* <Svg width={size} height={size}>
                                {rings.map((ring, i) => (
                                <Circle
                                    key={i}
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius - i * (strokeWidth + 5)} // tạo nhiều vòng
                                    stroke={ring.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${circumference * ring.progress} ${circumference}`}
                                    strokeLinecap="round"  // 👈 bo tròn đầu thật sự
                                    fill="none"
                                    rotation="-90"
                                    originX={size / 2}
                                    originY={size / 2}
                                />
                                ))}
                            </Svg> */}

                        </View>

                    </View>

                    {/* Chú thích */}
                    <View className="flex-row flex-wrap flex-1 -mx-3 mb-2 mt-2">
                        {pieData.map(renderLegendItem)}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#f3f4f6',
        // borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        fontFamily: 'sfbold',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#374151',
    },
});

export default SalesPieChart;
