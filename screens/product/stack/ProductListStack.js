import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import ProductItem from "../../../components/product/ProductItem";

const ProductListStack = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-4 bg-white flex-1 relative">
        <View className="mt-6">
          <Text className="text-gray-500 text-f15 font-sfregular">
            2.207 sản phẩm
          </Text>
          <View className="mt-4">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductAddStack")}
        className="absolute bottom-4 right-4 w-16 h-16 bg-blue-600 justify-center items-center rounded-full border-2 border-gray-400"
      >
        <HeroOutline.PlusIcon size={25} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductListStack;
