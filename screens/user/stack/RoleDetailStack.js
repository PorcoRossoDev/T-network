import { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import RoleItemCheck from "../../../components/user/RoleItemCheck";

const RoleDetailStack = ({ navigation }) => {
  const roles = [
    {
      id: 0,
      title: "Thành viên",
      group: [
        { id: 0, title: "Xem thành viên" },
        { id: 1, title: "Thêm thành viên" },
        { id: 2, title: "Sửa thành viên" },
        { id: 3, title: "Xoá thành viên" },
      ],
    },
    {
      id: 1,
      title: "Nhóm thành viên",
      group: [
        { id: 4, title: "Xem nhóm thành viên" },
        { id: 5, title: "Thêm nhóm thành viên" },
        { id: 6, title: "Sửa nhóm thành viên" },
        { id: 7, title: "Xoá nhóm thành viên" },
      ],
    },
    {
      id: 2,
      title: "Khách hàng",
      group: [
        { id: 8, title: "Xem tất cả khách hàng" },
        { id: 9, title: "Xem khách hàng được phụ trách" },
        { id: 10, title: "Thêm khách hàng" },
        { id: 11, title: "Sửa khách hàng" },
        { id: 12, title: "Xoá khách hàng" },
        { id: 13, title: "Khách hàng cần xử lý & quá hạn" },
        { id: 14, title: "Liên hệ theo thứ tự khách hàng" },
        { id: 15, title: "Ngày tạo cũ khách hàng" },
      ],
    },
    {
      id: 3,
      title: "Cấu hình hệ thống",
      group: [{ id: 16, title: "Sửa cấu hình hệ thống" }],
    },
    {
      id: 4,
      title: "Nhóm khách hàng",
      group: [
        { id: 17, title: "Xem nhóm khách hàng" },
        { id: 18, title: "Thêm nhóm khách hàng" },
        { id: 19, title: "Sửa nhóm khách hàng" },
        { id: 20, title: "Xoá nhóm khách hàng" },
      ],
    },
    {
      id: 5,
      title: "Hình thức thanh toán",
      group: [
        { id: 21, title: "Xem hình thức thanh toán" },
        { id: 22, title: "Thêm hình thức thanh toán" },
        { id: 23, title: "Sửa hình thức thanh toán" },
        { id: 24, title: "Xoá hình thức thanh toán" },
      ],
    },
    {
      id: 6,
      title: "Quản lý logs",
      group: [
        { id: 25, title: "Xem tất cả quản lý logs" },
        { id: 26, title: "Xem quản lý logs" },
      ],
    },
    {
      id: 7,
      title: "Quản lý tags",
      group: [
        { id: 27, title: "Xem tất cả quản lý tags" },
        { id: 28, title: "Xem quản lý tags" },
        { id: 29, title: "Thêm quản lý tags" },
        { id: 30, title: "Sửa quản lý tags" },
        { id: 31, title: "Xoá quản lý tags" },
      ],
    },
  ];

  const [roleActive, setRoleActive] = useState([
    1, 3, 4, 5, 6, 7, 9, 10, 11, 14, 15, 16, 17, 18, 20, 22, 23, 25,
  ]);
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleActive = (roleID) => {
    setRoleActive((prev) =>
      prev.includes(roleID)
        ? prev.filter((item) => item !== roleID)
        : [...prev, roleID]
    );
  };

  const [expandedItems, setExpandedItems] = useState([0, 2]);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderRoleItem = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <View className="px-3 mt-4">
        <View className="border-b border-gray-300 pb-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-sfregular">{item.title}</Text>
            <TouchableOpacity
              onPress={() => toggleExpand(item.id)}
              className="flex-row gap-x-1 items-center"
            >
              <Text className="font-sfregular text-gray-500">
                {item.group.length} quyền
              </Text>
              <View>
                <HeroOutline.ChevronDownIcon size={15} />
              </View>
            </TouchableOpacity>
          </View>
          <View className="">
            {isExpanded && (
              <FlatList
                numColumns={2}
                data={item.group}
                scrollEnabled={false} // ngăn cuộn bên trong
                nestedScrollEnabled={true} // bật nested scroll (Android)
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={(role) => (
                  <RoleItemCheck
                    toggleActive={() => toggleActive(role.item.id)}
                    active={roleActive.includes(role.item.id) ? true : false}
                  />
                )}
                keyExtractor={(role) => role.id}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 bg-white flex-1 relative">
        <View className="mt-6">
          <View>
            <Text className="font-sfmedium text-f15">
              <Text className="text-red-500">*</Text> Tên vai trò
            </Text>
            <TextInput
              className="border-b h-10 font-sfregular text-f14 border-gray-200"
              placeholder=""
            />
          </View>
          <View className="mt-4">
            <Text className="font-sfmedium text-f15">Team phụ trách</Text>
            <TextInput
              className="border-b h-10 font-sfregular text-f14 border-gray-200"
              placeholder=""
            />
          </View>
          <View className="mt-4">
            <View className="flex-row justify-between">
              <Text className="font-sfmedium text-f15">
                Phân quyền chi tiết
              </Text>
              <Text className="font-sfregular px-1 py-1 text-f13 rounded-lg bg-blue-100 border border-blue-300 text-blue-700">
                40/119 quyền
              </Text>
            </View>
            <TextInput
              className="border-b h-10 font-sfregular text-f14 border-gray-200"
              placeholder="Tìm kiếm module hoặc quyền..."
            />
          </View>

          <View
            className="mt-4"
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              // paddingVertical: 16,
              // Shadow cho iOS
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              // Shadow cho Android
              elevation: 6,
            }}
          >
            <FlatList
              data={roles}
              renderItem={renderRoleItem}
              scrollEnabled={false} // ngăn cuộn bên trong
              nestedScrollEnabled={true} // bật nested scroll (Android)
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
      <View className="flex-row justify-center gap-x-4 items-center px-5 mb-4 mt-4">
        <TouchableOpacity className="flex-row gap-x-1 w-[40%] h-11 justify-center items-center border-red-300 border rounded-md">
          <View>
            <HeroOutline.TrashIcon size={20} color={"red"} />
          </View>
          <Text className="text-red-600">Xoá</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-11 rounded-md items-center flex-row justify-center border-red-300 flex-1 bg-blue-700">
          <Text className="text-white">Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoleDetailStack;
