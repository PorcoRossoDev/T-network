import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View, Text } from "react-native";
import * as HeroSolid from "react-native-heroicons/solid";
import HeaderProduct from "../../components/product/HeaderProduct";
import { ProductAddStack, ProductOverviewStack, ProductListStack, ProductBrandStack, ProductCategoryStack, AttributeStack } from "./stack";

const Stack = createNativeStackNavigator();
const ProductScreen = () => {
  const navigation = useNavigation();
  const HeaderBar = ({ title, navigation }) => {
    return (
      <View
        className="bg-white"
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
          paddingVertical: 12,
        }}
      >
        {/* Icon Back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='absolute left-5 bottom-3 z-50'
        >
          <HeroSolid.ArrowLeftIcon size={22} />
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      </View>
    )
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="ProductOverviewStack"
        component={ProductOverviewStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Sản phẩm'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProductListStack"
        component={ProductListStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderProduct title={'Danh sách sản phẩm'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProductBrandStack"
        component={ProductBrandStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderProduct title={'Nhãn hiệu'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProductCategoryStack"
        component={ProductCategoryStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderProduct title={'Loại sản phẩm'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="AttributeStack"
        component={AttributeStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderProduct title={'Thuộc tính'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProductAddStack"
        component={ProductAddStack}
        options={({ navigation }) => ({
          title: "Thêm sản phẩm",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.ArrowLeftIcon size={20} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductOverviewStack")}
              className=""
            >
              <HeroOutline.CheckIcon size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default ProductScreen;
