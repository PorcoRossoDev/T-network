import { Platform, StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-native-gifted-charts';
// import { PieChart } from 'react-native-svg-charts';
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';


// import ProgressBar from '../common/ProgressBar';


// import Svg, { Circle } from 'react-native-svg';


const SalesPieChartAside1 = () => {
    const pieData = [
        { label: "Hà Nội", value: 20, color: "#9A0007" }, // đỏ đô
        { label: "Hồ Chí Minh", value: 22, color: "#D32F2F" }, // đỏ đậm
        { label: "Tỉnh/Công ty", value: 16, color: "#F44336" }, // đỏ tiêu chuẩn
        { label: "Không có tiềm năng", value: 18, color: "#FF8A80" }, // đỏ sáng
        { label: "Sàn TMĐT", value: 10, color: "#FFB3B3" }, // đỏ nhạt tươi
        { label: "Black List/Chặn", value: 10, color: "#FFD6D6" }, // đỏ hồng nhạt
    ];

    const renderDot = (color) => (
        <View className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: color }} />
    );

    const renderLegendItem = ({ label, color, value }) => (
        <View key={label} className={`relative ${Platform.OS === 'android' ? 'mt-4' : 'mt-3'}`}>
            <View className={`flex-row items-center ${Platform.OS === 'ios' ? 'mb-1' : 'mt-0'}`}>
                <View className={`w-[2px] h-4 bg-[#${color}] mx-2`} style={{backgroundColor: color }} />
                <Text className="text-f12 font-srmedium">{`${label}`}: </Text>
                <Text className="text-f12 text-gray-700">{`${value}%`}</Text>
            </View>
            {/* <ProgressBar progress={value} color={color} /> */}
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
            // style={{
            //     backgroundColor: "white",
            //     borderRadius: 10,
            //     // paddingVertical: 16,
            //     // Shadow cho iOS
            //     shadowColor: "#000",
            //     shadowOffset: { width: 0, height: 4 },
            //     shadowOpacity: 0.05,
            //     shadowRadius: 6,
            //     // Shadow cho Android
            //     elevation: 6,
            // }}
            style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            // paddingVertical: 15,
            // iOS
            shadowColor: '#0e3f7e',           // màu gần giống web
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            // Android
            elevation: 2,
          }}
            className=' rounded-xl bg-white mb-4'>
            <View
                className="rounded-xl px-5 pb-5 pt-3 bg-white"
            >
                <View className='flex-row justify-between items-center mb-4'>
                    <Text className="font-sfbold text-f18 text-gray-800">
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
                <View className='mt-3 flex-row gap-x-8'>
                    {/* Biểu đồ */}
                    <View className="items-center mb-1 w-1/2">
                        <View className=''>

                            <PieChart
                                data={pieData}
                                // donut
                                radius={100}
                                // innerRadius={65}
                                sectionSpace={5}               // 👈 tạo khoảng cách giữa các phần
                                strokeWidth={0}              // 👈 tạo đường viền nhẹ giữa phần và nền
                                strokeColor="#fff"
                                showGradient                   // 👈 làm mượt màu các lát
                                isAnimated
                                animationDuration={400}
                                innerCircleColor="#fff"
                                // centerLabelComponent={() => (
                                //     <View className="items-center">
                                //         <Text className="text-[19px] font-bold">47%</Text>
                                //         <Text className="text-[14px] text-gray-500">Excellent</Text>
                                //     </View>
                                // )}
                            />

                        </View>

                    </View>

                    {/* Chú thích */}
                    <View className="flex-1 -mx-3 mb-2 mt-2">
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

export default SalesPieChartAside1;
