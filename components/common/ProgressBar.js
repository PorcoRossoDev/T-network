import { View } from 'react-native';

const ProgressBar = ({ progress, color }) => {
    return (
        <View className="mt-2">
            <View className="w-full bg-gray-100 rounded-full h-[6px] overflow-hidden">
                <View
                className="h-[6px] rounded-md"
                style={{ width: `${progress}%`, backgroundColor: color }}
                />
            </View>
        </View>
    )
}

export default ProgressBar;