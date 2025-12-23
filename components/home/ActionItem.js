import { Text, TouchableOpacity, View } from "react-native";
import * as HeroOutline from "react-native-heroicons/outline";
import * as HeroSolid from "react-native-heroicons/solid";

const ActionItem = ({ name, id, icon, size = 26, color = '#fff', variant = 'solid', navigateTo = {}, navigation, background = '', close = false, plus = false, actionButton}) => {
  const sets = { solid: HeroSolid, outline: HeroOutline };
  const IconComponent = sets[variant]?.[icon];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" không tồn tại trong react-native-heroicons/${variant}`);
  }

  const handlePress = (navigateTo) => {
    if (navigateTo && navigateTo.name) {
      navigation.navigate(navigateTo.name, {
        screen: navigateTo.screen,
      });
    } else {
      console.warn('navigateTo không được cung cấp đúng định dạng');
    }
  }

  return (
    <TouchableOpacity 
      className="flex-1 items-center mb-4"
      onPress={actionButton ? actionButton : handlePress.bind(this, navigateTo??{})}
      >
      <View className={`relative w-[55%] aspect-square justify-center items-center rounded-full mb-2`} style={{ backgroundColor: background }}>
        {IconComponent ? (
          <IconComponent size={size} color={color} />
        ) : (
          <Text className="text-white text-xs">?</Text>
        )}
        {
            close == true ? (
            <View className='bg-red-500 rounded-full w-5 h-5 flex-1 justify-center items-center absolute top-[-3px] left-[-3px]'>
                <HeroSolid.XMarkIcon size={12} color={color} />
            </View>
            ) : (<></>)
        }
        {
            plus == true ? (
            <View className='bg-green-600 rounded-full w-5 h-5 flex-1 justify-center items-center absolute top-[-3px] left-[-3px]'>
                <HeroSolid.PlusIcon size={12} color={color} />
            </View>
            ) : (<></>)
        }
      </View>
      <Text className="text-center font-sfregular min-h-10 px-3 text-f13">{name}</Text>
    </TouchableOpacity>
  );
};

export default ActionItem;
