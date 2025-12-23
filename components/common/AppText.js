import { Text, TextProps } from "react-native";

type AppTextProps = TextProps & { weight?: "regular" | "medium" | "bold" };

export default function AppText({ style, weight = "regular", ...props }: AppTextProps) {
  const fontMap = {
    regular: "Nunito_400Regular",
    medium: "Nunito_500Medium",
    bold: "Nunito_700Bold",
  };

  return <Text {...props} style={[{ fontFamily: fontMap[weight] }, style]} />;
}