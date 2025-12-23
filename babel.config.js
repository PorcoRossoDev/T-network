module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel", // Required for NativeWind (Tailwind CSS)
      "react-native-reanimated/plugin", // Required for Reanimated, must be last
    ],
  };
};
