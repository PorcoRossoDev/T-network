import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";
import HeaderJob from '../../components/job/HeaderJob';
import { JobAddStack, JobCancelledStack, JobListStack, JobOverviewStack, JobPenddingStack, JobDetailStack } from './stack';

const Stack = createNativeStackNavigator();
const JobScreen = () => {
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
        name="JobOverviewStack"
        component={JobOverviewStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Công việc'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="JobDetailStack"
        component={JobDetailStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Chi tiết công việc'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="JobPenddingStack"
        component={JobPenddingStack}
        options={({navigation, route}) => ({
          header: () => <HeaderJob 
            title={'Công việc quá hạn'} 
            layoutOrder={route.params?.layoutOrder ?? false}
              onToggleLayout={() => {
                const current = route.params?.layoutOrder ?? false
                navigation.setParams({ layoutOrder: !current })
              }}
            navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="JobAddStack"
        component={JobAddStack}
        options={({ navigation, route }) => ({
          header: () => <HeaderBar title={'Tạo công việc'} navigation={navigation} />,
        })}
      />
      <Stack.Screen
          name="JobListStack"
          component={JobListStack}
          options={({navigation, route}) => ({
            header: () => <HeaderJob 
              title={'Danh sách công việc'} 
              layoutOrder={route.params?.layoutOrder ?? false}
                onToggleLayout={() => {
                  const current = route.params?.layoutOrder ?? false
                  navigation.setParams({ layoutOrder: !current })
                }}
              navigation={navigation} />,
          })}
        />
      <Stack.Screen
          name="JobCancelledStack"
          component={JobCancelledStack}
          options={({navigation, route}) => ({
            header: () => <HeaderJob 
              title={'Danh sách công việc huỷ'} 
              layoutOrder={route.params?.layoutOrder ?? false}
                onToggleLayout={() => {
                  const current = route.params?.layoutOrder ?? false
                  navigation.setParams({ layoutOrder: !current })
                }}
              navigation={navigation} />,
          })}
        />
    </Stack.Navigator>
  );
};

export default JobScreen;