import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import HeaderDisbursement from '../../components/disbursement/HeaderDisbursement';
import { DisbursemenCanclledStack, DisbursementAddStack, DisbursementDetailStack, DisbursementListStack, DisbursementOverviewStack, DisbursementPenddingStack } from './stack';

const Stack = createNativeStackNavigator();
const DisbursementScreen = () => {
  const navigation = useNavigation();
  const [layoutDisbursement, setlayoutDisbursement] = useState(false)
  const [layoutCanclled, setLayoutCanclled] = useState(false)

  const HeaderBar = ({title, navigation}) => {
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
            <HeroOutline.ArrowLeftIcon size={22} />
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
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="DisbursementOverviewStack"
        component={DisbursementOverviewStack}
        options={({navigation, route}) => ({
          header: () => <HeaderBar title={'Phiếu chi'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="DisbursementAddStack"
        component={DisbursementAddStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Tạo phiếu chi'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="DisbursementDetailStack"
        component={DisbursementDetailStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Chi tiết phiếu chi'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="DisbursementPenddingStack"
        component={DisbursementPenddingStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderDisbursement
            title={'Phiếu chi cần xử lý'}
            layoutDisbursement={route.params?.layoutDisbursement ?? false}
            onToggleLayout={() => {
              const current = route.params?.layoutDisbursement ?? false
              navigation.setParams({ layoutDisbursement: !current })
            }}
            navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="DisbursemenCanclledStack"
        component={DisbursemenCanclledStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderDisbursement
            title={'Phiếu chi đã huỷ'}
            layoutCanclled={route.params?.layoutCanclled ?? false}
            onToggleLayout={() => {
              const current = route.params?.layoutCanclled ?? false
              navigation.setParams({ layoutCanclled: !current })
            }}
            navigation={navigation}
          />,
        })}
      />
      <Stack.Screen
        name="DisbursementListStack"
        component={DisbursementListStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderDisbursement
            title={'Danh sách phiếu chi'}
            layoutList={route.params?.layoutList ?? false}
            onToggleLayout={() => {
              const current = route.params?.layoutList ?? false
              navigation.setParams({ layoutList: !current })
            }}
            navigation={navigation}
          />,
        })}
      />
    </Stack.Navigator>
  );
};

export default DisbursementScreen;
