import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { BarChart } from "react-native-gifted-charts";
import * as HeroSolid from "react-native-heroicons/solid";
import * as HeroOutline from "react-native-heroicons/outline";

const ReportTechnicalChart = () => {
    const navigation = useNavigation();
    const data = [
        { value: 80, label: "Hà Nội", frontColor: "#EF4444" },
        { value: 95, label: "HCM", frontColor: "#EF4444" },
        { value: 65, label: "Đà Nẵng", frontColor: "#EF4444" },
        { value: 50, label: "Hải Phòng", frontColor: "#EF4444" },
        { value: 40, label: "Cần Thơ", frontColor: "#EF4444" },
        { value: 30, label: "Khác", frontColor: "#EF4444" },
        { value: 45, label: "Online", frontColor: "#EF4444" },
    ];

    const screenWidth = Dimensions.get("window").width;
    const chartWidth = screenWidth - 36; // trừ padding

    // Thời gian
    const times = [
        { label: 'Năm nay', value: '0' },
        { label: '6 Tháng', value: '1' },
        { label: 'Tháng này', value: '2' },
    ];
    const [value, setValue] = useState('0');
    const [isFocus, setIsFocus] = useState(false);
    const [selected, setSelected] = useState("");

    const menu = [
        {
        id: "1",
        title: "Tổng doanh thu",
        value: "225.435.678 ₫",
        count: 117,
        color: "bg-blue-500",
        shadow: "#3b82f6",
        icon: HeroOutline.ShoppingCartIcon,
        },
        {
        id: "2",
        title: "Tổng hoá đơn VAT",
        value: "225.435.678 ₫",
        count: 90,
        color: "bg-green-500",
        shadow: "#22c55e",
        icon: HeroOutline.CheckCircleIcon,
        },
        {
        id: "3",
        title: "Tổng dịch vụ",
        value: "225.435.678 ₫",
        count: 88,
        color: "bg-purple-500",
        shadow: "#a855f7",
        icon: HeroOutline.CreditCardIcon,
        },
        {
        id: "4",
        title: "Tổng trả hoa hồng",
        value: "225.435.678 ₫",
        count: 21,
        color: "bg-yellow-400",
        shadow: "#eab308",
        icon: HeroOutline.ClockIcon,
        }
    ];

    return (
        <View className='flex-1'>
            <View className='px-5'>
                <View className="justify-between flex-row items-center">
                    {/* Dropdown */}
                    <View className="relative">
                        <Dropdown
                        style={[
                            {
                            minWidth: 120,      // 👈 Có thể bỏ nếu muốn hoàn toàn auto
                            width: 'auto',      // 👈 Quan trọng: cho phép dropdown co giãn theo nội dung
                            paddingHorizontal: 8,
                            borderRadius: 8,
                            alignSelf: 'flex-start'
                            },
                            isFocus && { borderColor: 'blue' },
                        ]}
                        selectedTextStyle={{
                            fontSize: 15,
                            color: '#fff',
                            fontFamily: 'SF-Pro-Display-Medium',
                            paddingRight: 20, // 👈 để text không đè lên icon
                        }}
                        itemTextStyle={{
                            fontSize: 15,
                            fontFamily: 'SF-Pro-Display-Regular',
                            color: '#000',
                        }}
                        itemContainerStyle={{
                            paddingVertical: 0,
                            minHeight: 0,
                        }}
                        data={times}
                        labelField="label"
                        valueField="value"
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderRightIcon={() => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -8 }}>
                            <HeroSolid.ChevronDownIcon size={18} color="#fff" />
                        </View>
                        )}
                        />
                    </View>

                    {/* Icon kế bên */}
                    <View className="ml-2"> 
                        <HeroSolid.FunnelIcon size={20} color="#fff" />
                    </View>
                </View>
            </View>
            

            <View className='px-4'>
                <View
                    style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        paddingBottom: 20,
                        // paddingVertical: 16,
                        // Shadow cho iOS
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.05,
                        shadowRadius: 6,
                        // Shadow cho Android
                        elevation: 6,
                    }}
                    className=' rounded-xl bg-white mb-4 mt-5'>
                    <View
                        className="rounded-xl pt-3"
                    >
                        <View className='mb-4 mt-3 px-4'>
                            <Text className="font-sfmedium text-f15 uppercase">
                                Doanh thu theo phân loại
                            </Text>
                        </View>
                        <View className='overflow-hidden px-2'>
                            <BarChart
                                data={data}
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
                    </View>
                </View>
            </View>
            

            <View className='pt-5 bg-white'>
                <View className="px-4 pt-0">
                    <Text className="text-f15 font-sfmedium uppercase text-gray-800 mb-4">
                        Báo cáo kinh doanh theo phân loại
                    </Text>
            
                    <FlatList
                    scrollEnabled={false}
                    data={menu}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        const Icon = item.icon;
                        return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Order', { screen: 'OrderListStack' })}
                            activeOpacity={0.9}
                            className="mb-3"
                        >
                            <View
                            className={`flex-row items-center bg-white p-3 rounded-3xl ${Platform.OS=='ios'?'border-gray-200':'border-gray-200'}  border`}
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.03,
                                shadowRadius: 12,
                                elevation: 0,
                            }}
                            >
                            {/* Icon */}
                            <View
                                className={`w-11 h-11 rounded-full ${item.color} border border-gray-200 items-center justify-center shadow-lg mr-4`}
                                style={{
                                shadowColor: "#ef4444",
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.2,
                                shadowRadius: 12,
                                elevation: 1,
                                }}
                            >
                                <Icon size={20} color={'#fff'} strokeWidth={2} />
                            </View>
            
                            {/* Text */}
                            <View className="flex-1">
                                <Text className="text-f16 font-sfmedium text-gray-800">
                                {item.title}
                                </Text>
                                <Text className="text-gray-500">{item.value}</Text>
                            </View>
            
                            {/* Badge */}
                            <View
                                className={`px-2 py-1 rounded-full bg-gray-100 bg-opacity-20 flex flex-row items-center justify-center`}
                            >
                                <Text className="text-black text-xs font-sfmedium">
                                {item.count}
                                </Text>
                                <Text>
                                    <HeroOutline.ChevronRightIcon size='13' />
                                </Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                        );
                    }}
                    />
                </View>
            </View>

            <View className='mt-6 mb-5 px-5 bg-white'>
                <View className='flex flex-row justify-between items-center'>
                    <Text className='uppercase text-f14 font-sfregular'>Báo cáo chi tiết theo phân loại</Text>
                    <View className="relative border border-gray-400 rounded-md pl-1 py-1">
                        <Dropdown
                        style={[
                            {
                            minWidth: 120,      // 👈 Có thể bỏ nếu muốn hoàn toàn auto
                            width: 'auto',      // 👈 Quan trọng: cho phép dropdown co giãn theo nội dung
                            paddingHorizontal: 8,
                            borderRadius: 8,
                            alignSelf: 'flex-start'
                            },
                            isFocus && { borderColor: 'blue' },
                        ]}
                        selectedTextStyle={{
                            fontSize: 15,
                            color: '#000',
                            fontFamily: 'SF-Pro-Display-Regular',
                            paddingRight: 20, // 👈 để text không đè lên icon
                        }}
                        itemTextStyle={{
                            fontSize: 15,
                            fontFamily: 'SF-Pro-Display-Regular',
                            color: '#000',
                        }}
                        itemContainerStyle={{
                            paddingVertical: 0,
                            minHeight: 0,
                        }}
                        data={times}
                        labelField="label"
                        valueField="value"
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderRightIcon={() => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -8 }}>
                            <HeroSolid.ChevronDownIcon size={18} color="#000" />
                        </View>
                        )}
                        />
                    </View>
                </View>
                <View className='flex-row mt-6'>
                    <View className='w-1/3'>
                        <Text className='font-sfregular text-f14 text-gray-500'>Doanh thu</Text>
                        <Text className='font-sfbold text-blue-700 mt-1 text-f16'>1.400.000</Text>
                    </View>
                    <View className='w-1/3 relative'>
                        <View className='relative'>
                            <View className='h-[90%] w-[0.5px] bg-gray-300 absolute left-0 top-1/2 translate-y-[-50%] z-50' />
                            <View className=''>
                                <Text className='text-center font-sfregular text-f14 text-gray-500'>Thu đơn hàng</Text>
                                <Text className='text-center font-sfbold text-green-700 mt-1 text-f16'>900.000</Text>
                            </View>
                            <View className='h-[90%] w-[0.5px] bg-gray-300 absolute right-0 top-1/2 translate-y-[-50%] z-50' />
                        </View>
                    </View>
                    <View className='w-1/3'>
                        <Text className='text-right font-sfregular text-f14 text-gray-500'>Thu công việc</Text>
                        <Text className='text-right font-sfbold text-yellow-700 mt-1 text-f16'>450.000</Text>
                    </View>
                </View>

                <View
                className='mt-5 px-5'
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
                >
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Report',{screen: 'ReportCustomerStack'})}
                    className='py-3 mb-2 border-b border-gray-200'>
                        <View className='flex-row justify-between'>
                            <Text className='font-sfmedium text-f16'>Nguyễn Mạnh Chiến</Text>
                            <View className='flex-row flex-wrap items-center'>
                                <Text className='text-f13 font-sfmedium'>21</Text>
                                <Text className='ml-2'>
                                    <HeroSolid.ChevronRightIcon size={16} color={'#9ca3af'} />
                                </Text>
                            </View>
                        </View>
                        <View className='flex-row justify-between mt-1'>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Thu đơn hàng</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Thu công việc</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Tổng thu</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='py-3 mb-2 border-b border-gray-200'>
                        <View className='flex-row justify-between'>
                            <Text className='font-sfmedium text-f16'>Tuấn Anh</Text>
                            <View className='flex-row flex-wrap items-center'>
                                <Text className='text-f13 font-sfmedium'>21</Text>
                                <Text className='ml-2'>
                                    <HeroSolid.ChevronRightIcon size={16} color={'#9ca3af'} />
                                </Text>
                            </View>
                        </View>
                        <View className='flex-row justify-between mt-1'>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Thu đơn hàng</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Thu công việc</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Tổng thu</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='py-3 mb-2 '>
                        <View className='flex-row justify-between'>
                            <Text className='font-sfmedium text-f16'>Huy Huân</Text>
                            <View className='flex-row flex-wrap items-center'>
                                <Text className='text-f13 font-sfmedium'>21</Text>
                                <Text className='ml-2'>
                                    <HeroSolid.ChevronRightIcon size={16} color={'#9ca3af'} />
                                </Text>
                            </View>
                        </View>
                        <View className='flex-row justify-between mt-1'>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Thu đơn hàng</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Thu công việc</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                            <View>
                                <Text className='text-gray-500 font-sfregular text-f15'>Tổng thu</Text>
                                <Text className='font-sfmedium text-center text-f14'>0</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
        fontFamily: 'sfbold',
        // width: '120'
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#374151',
    },
});

export default ReportTechnicalChart;
