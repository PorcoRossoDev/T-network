import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "../../../context/AuthContext";
import { enableFaceId, disableFaceId } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CustomerResetPinScreen = () => {

  // // Mã PIN
  // const CELL_COUNT = 6;
  // const [pin, setPin] = useState('');
  // const ref = useBlurOnFulfill({ value: pin, cellCount: CELL_COUNT });
  // const [props, getCellOnLayoutHandler] = useClearByFocusCell({
  //   value: pin,
  //   setValue: setPin,
  // });

  // const [disableButton, setDisableButton] = useState(true);
  // const onComplete = (code) => {
  //   if (code.length === CELL_COUNT) {
  //     setDisableButton(false);
  //   } else {
  //     setDisableButton(true);
  //   }
  // };

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const logo = require("../../../assets/images/logo.webp");
  // Focus states
  const [focus, setFocus] = useState({});
  const handleFocus = (name) => setFocus((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocus((prev) => ({ ...prev, [name]: false }));

  const { width } = Dimensions.get('window');
  const [set, setStep] = useState(0)
  const translateX = useRef(new Animated.Value(0)).current

  const goStep = (nextStep) => {
    Animated.timing(translateX, {
      toValue: -width*nextStep,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setStep(nextStep)
  }

  const HeaderBar = () => {
    return (
      <View className="px-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={navigation.goBack} className="w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
            <Fontisto name="angle-left" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="">
          <Image source={logo} className="w-12 h-12" resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity className="w-12 h-12 justify-center items-center bg-gray-100 rounded-full">
          <MaterialIcons name="support-agent" size={35} color="black" />
        </TouchableOpacity>
      </View>
    )
  }

  const StepOne = ({width}) => {
    // Mã PIN
    const CELL_COUNT = 6;
    const [pin, setPin] = useState('');
    const ref = useBlurOnFulfill({ value: pin, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value: pin,
      setValue: setPin,
    });

    const [disableButton, setDisableButton] = useState(true);
    const onComplete = (code) => {
      if (code.length === CELL_COUNT) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    };
    return (
      <View style={{ width }} className="flex-1 justify-between">
        <View className="flex-1]">
          <HeaderBar />
          <View className="px-4">
            <Text className="text-center text-2xl font-sgbold mt-8">Nhập mã OPT của bạn</Text>
            <Text className="text-center text-gray-500 mt-3 text-f15 font-sgregular">
              Chúng tôi đã gửi mã gồm sáu chữ số đến email <Text className="text-blue-500">binh35***12@gmail.com</Text> mà bạn đã cung cấp
            </Text>
          </View>

          <View className="px-4 mt-8 relative">
            <View className="">
              <CodeField
                ref={ref}
                {...props}
                value={pin}
                onChangeText={text => {
                  setPin(text);
                  if (text.length === CELL_COUNT) {
                    onComplete?.(text);
                  }
                }}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                secureTextEntry
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    className={`w-[55px] h-[65px] leading-[65px] rounded-xl text-center text-f18 font-sgregular overflow-hidden ${isFocused ? 'border-primary border bg-white' : 'border-transparent bg-gray-200 '}`}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol ? '•' : isFocused ? <Cursor /> : null}
                  </Text>
                )}
              />
            </View>
            <TouchableOpacity className="mt-4">
                <Text className="text-center font-sgbold text-blue-600">Gửi lại</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-4">
          <TouchableOpacity onPress={() => goStep(1)} className={`bg-primary rounded-[40px] h-16 justify-center items-center`}>
            <Text className="text-white text-center font-sgbold text-f17">Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  const StepTwo = ({width}) => {
    // Mã PIN
    const CELL_COUNT = 6;
    const [pin, setPin] = useState('');
    const ref = useBlurOnFulfill({ value: pin, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value: pin,
      setValue: setPin,
    });

    const [disableButton, setDisableButton] = useState(true);
    const onComplete = (code) => {
      if (code.length === CELL_COUNT) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    };
    return (
      <View style={{ width }} className="flex-1 justify-between">
        <View className="flex-1]">
          <HeaderBar />
          <View className="px-4">
            <Text className="text-center text-2xl font-sgbold mt-8">Cập nhật PIN của bạn</Text>
            <Text className="text-center text-gray-500 mt-3 text-f15 font-sgregular">
              Nhập vào mã PIN của bạn sẽ được thay thế bằng mã PIN mới
            </Text>
          </View>

          <View className="px-4 mt-8 relative">
            <View className="">
              <CodeField
                ref={ref}
                {...props}
                value={pin}
                onChangeText={text => {
                  setPin(text);
                  if (text.length === CELL_COUNT) {
                    onComplete?.(text);
                  }
                }}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                secureTextEntry
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    className={`w-[55px] h-[65px] leading-[65px] rounded-xl text-center text-f18 font-sgregular overflow-hidden ${isFocused ? 'border-primary border bg-white' : 'border-transparent bg-gray-200 '}`}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol ? '•' : isFocused ? <Cursor /> : null}
                  </Text>
                )}
              />
            </View>
          </View>
        </View>
        <View className="px-4">
          {
            disableButton ? (
              <TouchableOpacity onPress={() => goStep(0)} className={`bg-primary rounded-[40px] h-16 justify-center items-center`}>
                <Text className="text-white text-center font-sgbold text-f17">Quay lại</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity onPress={() => goStep(1)} className={`bg-primary rounded-[40px] h-16 justify-center items-center`}>
                <Text className="text-white text-center font-sgbold text-f17">Xác nhận</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white pt-5">        
      <View className="overflow-hidden flex-1">
        <Animated.View
          style={{
            flexDirection: 'row',
            width: width * 2,
            transform: [{ translateX }],
          }}
          className="flex-1"
        >
          {/* STEP 1 */}
          <StepOne width={width} />

          {/* STEP 2 */}
          <StepTwo width={width} />
        </Animated.View>
      </View>
    </View>
  );
}

export default CustomerResetPinScreen