import React, { useState, useRef, useCallback } from 'react';
import { Pressable, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";
import CustomerDetailFilter from '../../../components/customer/CustomerDetailFilter';

export default function CustomerDetailStack() {

    const [active, setActive] = useState(0)

    const Row = ({ label, value }) => {
        return (
            <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600 font-sfregular text-f15">{label}</Text>
                <Text className="text-black font-sfregular text-f15">{value}</Text>
            </View>
        );
    }

    const handleTab = (index) => {
        setActive(index)
    }

    const bottomSheetRef = useRef(null);
    
    const openSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const closeSheet = useCallback(() => {
        bottomSheetRef.current?.dismiss();
    }, []);

    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            <Text className='font-sfbold text-f19 mt-3'>Anh Nam</Text>

            <View className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100 mt-4">
                <Text className="text-f18 font-sfbold mb-3">Thông tin đơn hàng</Text>
                <View className='flex-col gap-y-1'>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Mã khách hàng</Text>
                        <Text className='flex-1 text-right'>031225015</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Ngày tạo</Text>
                        <Text className='flex-1 text-right'>14:31 03/12/2025</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Số điện thoại</Text>
                        <Text className='flex-1 text-right'>0989899098</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Địa chỉ</Text>
                        <Text className='flex-1 text-right'>Số nhà 20, Tổ dân phố 175 xã Xuân Sơn, TX Sơn Tây, Hà Nội</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Nhu cầu</Text>
                        <Text className='flex-1 text-right'>-</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Nhóm khách hàng</Text>
                        <Text className='flex-1 text-right'>Tự động</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Phân loại</Text>
                        <Text className='flex-1 text-right'>Hà Nội</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Nguồn</Text>
                        <Text className='flex-1 text-right'>Facebook</Text>
                    </View>
                </View>
            </View>

            <View className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100">
                <Text className="text-f18 font-sfbold mb-3">Thông tin đơn hàng</Text>
                <View className='flex-col gap-y-1'>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Tổng chi tiêu</Text>
                        <Text className='flex-1 text-right'>0</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Tổng SL đơn hàng</Text>
                        <Text className='flex-1 text-right'>1</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Ngày cuối cùng mua hàng</Text>
                        <Text className='flex-1 text-right'>2025-12-03 14:32:20</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Tổng SL sản phẩm đã mua</Text>
                        <Text className='flex-1 text-right'>0</Text>
                    </View>
                    <View className='flex-row gap-x-2'>
                        <Text className='w-1/2'>Tổng SL sản phẩm hoàn trả</Text>
                        <Text className='flex-1 text-right text-red-700'>5:189:200</Text>
                    </View>
                </View>
            </View>

            {/* Tabs */}
            <View className='bg-white shadow rounded-lg p-4 mb-4 border border-gray-100 '>
                <View className='flex-row justify-between items-center'>
                    <Text className="text-f18 font-sfbold mb-3">Thông tin</Text>
                    <TouchableOpacity onPress={openSheet} className='-translate-y-2'>
                        <HeroSolid.FunnelIcon size={22} color='#2563eb' />
                    </TouchableOpacity>
                </View>

                <View className="flex-row mb-4">
                    {["Lịch sử mua hàng", "Lịch sử liên hệ", "Báo giá", "Xuất VAT"].map((tab, index) => (
                    <TouchableOpacity onPress={() => handleTab(index)} key={index} className="mr-4">
                        <Text className={` ${index === active ? "font-sfmedium text-blue-600 text-f15" : "text-gray-500 text-f14"}`}>
                        {tab}
                        </Text>
                        {index === active && <View className="h-[1px] bg-blue-600 mt-1 rounded-full" />}
                    </TouchableOpacity>
                    ))}
                </View>

                {/* Table Header */}
                <View className="flex-row bg-gray-100 py-3 px-2">
                    <Text className="flex-1 font-sfmedium text-f15">Mã đơn hàng</Text>
                    <Text className="flex-1 text-right font-sfmedium text-f15">Trạng thái</Text>
                </View>

                {/* Order Item */}
                <View className="">
                    <View className="flex-row mt-3">
                        <Text className="flex-1 text-blue-600 font-sfmedium text-f15">031225-011</Text>
                        <Text className="flex-1 text-right font-sfregular text-f15">14:32 03/12/2025</Text>
                    </View>

                    <View className="mt-2">
                        <Row label="Tên khách hàng" value="Anh Nam" />
                        <Row label="Bán bởi" value="Ngọc Linh" />
                        <Row label="Thanh toán" value="5.189.200 đ" />
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-600 font-sfregular text-f15">Liên hệ</Text>
                            <View className="flex-row items-center space-x-2">
                                <Text className="text-blue-600 font-semibold text-f16">Zalo</Text>
                                <TouchableOpacity className="bg-orange-400 px-2 py-0.5 rounded-lg">
                                    <Text className="text-white font-sfregular text-f15">Đặt hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>

                    <Text className="text-gray-500 font-sfregular text-f15">Trang 1 của 1 (Tổng: 1 mục)</Text>
                </View>
            </View>

            <CustomerDetailFilter ref={bottomSheetRef} onClose={closeSheet} />

        </ScrollView>
    );
}
