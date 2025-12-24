import React, { useContext, useRef, useEffect, useState } from "react";
import { ActivityIndicator, View, StatusBar, Platform } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import StackNavigator from "./StackNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import PinScreen from "../screens/auth/PinScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import notificationServiceWrapper from "../services/notificationServiceWrapper";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigationRef = useRef(); // Tham chiếu đến navigation container

  // Thiết lập navigation reference khi navigator sẵn sàng
  useEffect(() => {
    if (navigationRef.current) {
      // Đặt navigation reference cho notificationServiceWrapper
      notificationServiceWrapper.setNavigationRef(navigationRef);

      // Xử lý các thông báo đang chờ xử lý
      notificationServiceWrapper.handlePendingNotifications();
    }
  }, [isAuthenticated]);
  const [navReady, setNavReady] = useState(false);


  /**
   * Xử lý khi navigation container sẵn sàng
   */
  const onNavigationReady = () => {
    // Đặt navigation reference cho notificationServiceWrapper
    notificationServiceWrapper.setNavigationRef(navigationRef);

    // Xử lý các thông báo đang chờ xử lý
    notificationServiceWrapper.handlePendingNotifications();

    const initialRoute = navigationRef.current?.getCurrentRoute()?.name;
    setCurrentRoute(initialRoute);
    setNavReady(true);
  };

  // Lấy Screen hiện tại
  const [currentRoute, setCurrentRoute] = useState('Home');
  const getActiveRouteName = (state) => {
    if (!state) return null;
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    console.log(currentRoute)
    return route.name;
  };

  const isHome = navReady && (currentRoute === 'Home' || currentRoute === 'ReportOverviewStack');
  let topColor = isHome ? '#c9252b' : 'transparent';

  if( currentRoute == 'ReportOverviewStack'){
    topColor = '#b71c1c'
  } 

  // Hiển thị loading khi đang kiểm tra authentication
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" color="#ED1723" />
      </View>
    );
  }
  

  return (
    <>
      {/* --- SAFE AREA TOP (luôn tồn tại) --- */}
      
      {
        currentRoute !== 'ReportOverviewStack' && (
          <SafeAreaView
            edges={['top']}
            style={{
              backgroundColor: topColor,
            }}
          />
        )
      }
      

      <StatusBar
        translucent={false}
        backgroundColor={topColor}
        barStyle={isHome ? "light-content" : "dark-content"}
      />

      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"   // hoặc 'dark-content'
      /> */}

      
      <SafeAreaView 
        edges={['left','right','bottom']}
        style={{ flex: 1, backgroundColor: '#fff' }}>
          <NavigationContainer ref={navigationRef} 
            onStateChange={(state) => {
              const routeName = getActiveRouteName(state);
              setCurrentRoute(routeName);
            }} 
            onReady={onNavigationReady}
            >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isAuthenticated ? (
                // Người dùng đã xác thực - hiển thị main stack
                <Stack.Screen name="MainStack" component={StackNavigator} />
              ) : (
                // Người dùng chưa xác thực - hiển thị login screens
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Pin" component={PinScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </>
    
  );
}

export default AppNavigator;