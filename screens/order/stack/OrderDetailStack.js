import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import * as HeroSolid from "react-native-heroicons/solid";

// Hàm format tiền
const money = (v) => v.toLocaleString("vi-VN");

export default function OrderAddStack() {
  
  // Lịch sử trạng thái
  const timeLine = [
    {
      title: 'Đơn hàng được tạo bởi',
      created_at: '10:21 20/11/2025',
      user: "Võ Ngọc Trúc",
    },
    {
      title: 'Đơn hàng được tạo bởi',
      created_at: '10:21 20/11/2025',
      user: "Võ Ngọc Trúc",
    },
    {
      title: 'Đơn hàng được tạo bởi',
      created_at: '10:21 20/11/2025',
      user: "Võ Ngọc Trúc",
    },
    {
      title: 'Đơn hàng được tạo bởi',
      created_at: '10:21 20/11/2025',
      user: "Võ Ngọc Trúc",
    },
  ];

  // Tham chiếu đối soát
  const timeLineView = [
    {
      title: 'bởi',
      created_at: '10:21 20/11/2025',
      user: "Võ Ngọc Trúc",
      type: 'success',
      description: 'SD TK 098989847590038 +799,000VND lúc 20-11-2025 10:26:1. Ref 020097048811201026172056gf3661232 ANH QUANG HUNG 981',
    },
    {
      title: 'bởi',
      created_at: '10:21 20/11/2025',
      user: "Võ Ngọc Trúc",
      type: 'error',
      description: 'SD TK 098989847590038 +799,000VND lúc 20-11-2025 10:26:1. Ref 020097048811201026172056gf3661232 ANH QUANG HUNG 981',
    },
  ];

  const TimelineList = ({data}) => {
    return (
      <View className="">
        {data.map((item, index) => (
          <View key={index} className="flex flex-row gap-x-3">

            {/* Dot + Line */}
            <View className="relative">
              {! (index === data.length - 1) && (
                <View className="absolute top-7 bottom-0 left-[11px] w-px bg-gray-200" />
              )}

              <View className="w-7 h-7 flex items-center justify-center">
                <View className="w-2 h-2 rounded-full bg-blue-400" />
              </View>
            </View>

            {/* Right content */}
            <View className="flex-1 pb-3">
              <Text className='text-f14 font-sfregular text-gray-800'>
                {item.created_at}
              </Text>

              <Text className="mt-1 font-sfregular text-f15 text-sm text-gray-600">
                {item.title}
                <Text className='font-sfbold text-f15'> {item.user}</Text>
              </Text>

              {
                item.description && (
                  <Text className={`${item.type=='success'?'bg-green-100 border border-green-200 text-green-700':'bg-red-100 border border-red-200 text-red-700'} p-2 mt-2 font-sfregular text-f15`}>{item.description}</Text>
                )
              }
            </View>
          </View>
        ))}
      </View>
    )
  }

  const order = {
    id: '#201125-127',
    statusLabel: 'Chưa thanh toán',
    customer: {
      name: 'Trần Triệu Luân',
      phone: '0353696226',
      address: 'Củ Chi',
    },
    amount: 699000,
    history: [
      { time: '10:28 20/11/2025', note: 'Nhận đơn bởi Võ Ngọc Trúc' },
    ],
    orderInfo: {
      createdAt: '10:21 20/11/2025',
      due: '20/11/2025',
      handler: 'Võ Ngọc Trúc',
      paymentNotes:
        'SD TK 0931004203198 +699,000VND lúc 20-11-2025 10:26:1. Ref 020097048811201026172056gf3661232...',
    },
  };

  const ItemProductTab = () => {
    return (
      <View className='flex-row justify-between mb-3 pb-3 border-b border-gray-200'>
        <Text className='w-12'>1</Text>
        <View className='w-[50%]'>
          <Text className='font-sfregular'>Tinh dầu Galaxy Macau 50ml</Text>
          <View className='flex-row mt-1'>
            <Text className='font-sfregular text-sm'>Đơn giá: </Text>
            <Text className='font-sfmedium text-red-500 text-sm'>799.000đ</Text>
          </View>
          <View className='flex-row mt-1'>
            <Text className='font-sfregular text-sm'>Chiết khấu: </Text>
            <Text className='font-sfmedium text-red-500 text-sm'>0đ</Text>
          </View>
        </View>
        <Text className='w-[5%] text-center text-sm'>5</Text>
        <Text className='w-[30%] text-center text-sm'>799.000đ</Text>
      </View>
    )
  }

  // Tab thông tin đơn hàng
  const [activeTab, setActiveTab] = React.useState('product');
  const listTabs = [
    { key: 'product', label: 'Thông tin sản phẩm' },
    { key: 'cancel', label: 'Lịch sử hủy đơn' },
    { key: 'history', label: 'Lịch sử liên hệ' },
  ]

  return (
    <ScrollView className="px-4 bg-white">

      {/* Order ID */}
      <View className="flex-row items-center justify-between mt-7 mb-4">
        <Text className="text-f20 font-sfbold text-black">{order.id}</Text>

        <View className="bg-[#fff0ea] px-3 py-1 rounded-md">
          <Text className="text-[#d35400] font-medium">{order.statusLabel}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row gap-x-3 mb-4">
        <Pressable className="bg-blue-600 px-4 py-2 rounded-lg flex-row items-center">
          <Text className="text-white font-sfregular text-f16">
            <View className='translate-y-1 pr-1'>
              <HeroSolid.PrinterIcon size='14' color='#fff' />
            </View>
            In đơn hàng
          </Text>
        </Pressable>

        <Pressable className="bg-blue-600 px-4 py-2 rounded-lg flex-row items-center">
          <Text className="text-white font-sfregular text-f16">
            <View className='translate-y-1 pr-1'>
              <HeroSolid.TruckIcon size='17' color='#fff' />
            </View>
            Đã giao hàng
          </Text>
        </Pressable>
      </View>

      {/* Thông tin khách hàng */}
      <View className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100">
        <Text className="text-f18 font-sfbold mb-2">Thông tin khách hàng</Text>

        <View>
          <Text className='font-sfmedium text-blue-600 text-f15'>
            Dũng - 0909898787 <Text className='translate-y-1.5'><HeroSolid.PencilSquareIcon size='17' color='#000' /></Text>
          </Text>
        </View>

        <View className='mt-1 flex-row'>
          <Text className='w-2/5 font-sfregular text-f16'>Số điện thoại: </Text>
          <Text className='flex-1 font-sfregular text-f16'>0902210689</Text>
        </View>

        <View className='mt-1 flex-row'>
          <Text className='w-2/5 font-sfregular text-f16'>Địa chỉ giao hàng: </Text>
          <Text className='flex-1 font-sfregular text-f16'>Ngõ 6 số nhà 26 phường Cao Xanh Hạ Long Quảng Ninh</Text>
        </View>

        <View className='border-t border-gray-200 mt-4 pt-3'>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-sfregular text-f16'>Tổng SL đơn hàng</Text>
            <Text className='font-sfregular text-f16'>1</Text>
          </View>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-sfregular text-f16'>Ngày cuối cùng mua hàng</Text>
            <Text className='font-sfregular text-f16'>14:00 12/11/2025</Text>
          </View>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-sfregular text-f16'>Công nợ hiện tại</Text>
            <Text className='font-sfbold text-red-600 text-f16'>2.565.000 đ</Text>
          </View>
        </View>
      </View>

      {/* Đơn hàng chờ thanh toán */}
      <View className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100">
        <View className="">
          <Text className="text-f18 font-sfbold mb-3">Đơn hàng chờ thanh toán</Text>
          <View className='items-start flex-row gap-x-2'>
            <View className="bg-red-600 px-4 h-9 items-center justify-center rounded-lg mb-4">
              <View className="flex-row items-center">
                <HeroSolid.DocumentIcon size={18} color="#fff" />
                <Text className="text-white font-sfregular text-f16 ml-1">Xuất VAT</Text>
              </View>
            </View>
            <View className="bg-blue-600 px-4 h-9 items-center justify-center rounded-lg mb-4">
              <View className="flex-row items-center">
                <HeroSolid.CurrencyDollarIcon size={20} color="#fff" />
                <Text className="text-white font-sfregular text-f16 ml-1">Đã nhận tiền</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-f16 font-medium">Khách phải trả:</Text>
            <Text className="text-f16 font-bold text-red-600">
              {money(order.amount)} đ
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-f16">Đã thanh toán:</Text>
            <Text className="text-f16 font-medium">0</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-f16">Còn phải trả:</Text>
            <Text className="text-f16 font-bold text-red-600">
              {money(order.amount)} đ
            </Text>
          </View>
        </View>
      </View>

      {/* Lịch sử trạng thái */}
      <View className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100">
        <Text className="text-f18 font-bold mb-3">Lịch sử trạng thái</Text>
        <TimelineList data={timeLine} />
      </View>

      {/* Thông tin đơn hàng */}
      <View className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100">
        <Text className="text-f18 font-sfbold mb-3">Thông tin đơn hàng</Text>
        <View className='flex-row gap-x-2'>
          <View className='w-1/2'>
            <Text className="font-sfregular mb-2">
              <Text className='font-sfmedium text-f16'>Lịch chăm sóc:</Text> 60 ngày 
            </Text>
          </View>
          <View className='flex-1'>
            <Text className="font-sfregular mb-2 text-f16">
              <Text className='font-sfmedium text-f16'>Nguồn:</Text> Showroom
            </Text>
          </View>
        </View>
        <Text className="font-sfregular mb-2 text-f16">
            <Text className='font-sfmedium text-f16'>Bán bởi:</Text> Võ Ngọc Trúc
        </Text>
        <Text className="font-sfregular mb-2 text-f16">
            <Text className='font-sfmedium text-f16'>Xử lý bởi:</Text> Võ Ngọc Trúc
        </Text>

        <View className='flex-row gap-x-2'>
          <View className='w-1/2'>
            <Text className="font-sfregular mb-2 text-f15">
              <Text className='font-sfmedium text-f16'>Ngày tạo:</Text> 10:21 20/11/2025 
            </Text>
          </View>
          <View className='flex-1'>
            <Text className="font-sfregular mb-2 text-f15">
              <Text className='font-sfmedium text-f16'>Hẹn giao:</Text> 20/11/2025
            </Text>
          </View>
        </View>
        <Text className="font-sfregular mb-2 text-f16">
            <Text className='font-sfmedium text-f16'>Thanh toán:</Text> Đã thanh toán
        </Text>
        <Text className="font-sfregular mb-2 text-red-600 text-f16">
            <Text className='font-sfmedium text-red-600 text-f16'>Ghi chú:</Text> Bổ sung PO HCM QTH Pinater. Khách cần 28.11 anh vào gấp gúp em
        </Text>
      </View>

      {/* Tham chiếu đối soát */}
      <View className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100">
        <Text className="text-f18 font-sfbold mb-3">Tham chiếu đối soát <Text className='translate-y-2'><HeroSolid.PencilSquareIcon size='17' color='#000' /></Text></Text>
        <TimelineList data={timeLineView} />
      </View>

      {/* Thông tin tab */}
      <View className="px-4 pt-4">
        <View className="flex-row items-start">
          {
            listTabs.map(tab => (
                <Pressable key={tab.key} onPress={() => setActiveTab(tab.key)} className="mr-6">
                  <Text className={`text-f14 font-sfregular ${activeTab === tab.key ? 'text-blue-600' : 'text-black'}`}>{tab.label}</Text>
                  {activeTab === tab.key && <View className="h-[1px] bg-blue-500 mt-2 rounded-full w-20" />}
                </Pressable>
              ))
          }
        </View>
      </View>


      <View className='mt-5 bg-white shadow rounded-lg p-4 mb-6 border border-gray-100'>
        {/* Switch content by tab */}
          {activeTab === 'product' && (
          <>
            {/* Table header */}
            <View className="flex-row justify-between border-b border-gray-200 pb-3 mb-3">
              <Text className="w-12 text-sm font-sfbold">STT</Text>
              <Text className="w-[50%] text-sm font-sfbold">Sản phẩm</Text>
              <Text className="w-[5%] text-sm font-sfbold text-center">SL</Text>
              <Text className="w-[30%] text-sm font-sfbold text-center">Thành tiền</Text>
            </View>

            {/* Table content */}
            <ItemProductTab />
            <ItemProductTab />

            <View>
              <View className='flex-row justify-between mt-1'>
                <Text className='font-sfregular text-base'>Tổng tiền (1 sản phẩm) </Text>
                <Text className='font-sfmedium text-sm'>799.000đ</Text>
              </View>
              <View className='flex-row justify-between mt-1'>
                <Text className='font-sfregular text-base'>Chiết khấu</Text>
                <Text className='font-sfmedium text-red-500 text-sm'>0đ</Text>
              </View>
              <View className='flex-row justify-between mt-1'>
                <Text className='font-sfregular text-base'>Giảm giá</Text>
                <Text className='font-sfmedium text-red-500 text-sm'>0đ</Text>
              </View>
              <View className='flex-row justify-between mt-1'>
                <Text className='font-sfregular text-base'>Khách phải trả</Text>
                <Text className='font-sfmedium text-blue-500 text-sm'>799.000đ</Text>
              </View>
            </View>
          </>
          )}

          {activeTab === 'cancel' && (
          <View className="">
            <Text className="text-base text-gray-600 font-sfregular">Không có lịch sử hủy đơn</Text>
          </View>
          )}
          
          {activeTab === 'history' && (
          <View className="">
            <Text className="text-base text-gray-600 font-sfregular">Không có lịch sử liên hệ</Text>
          </View>
          )}
      </View>

    </ScrollView>
  );
}
