import React from "react";
import { View, Text as RNText } from "react-native";

export function HeavyFakeBlurText({ children, style }) {
  const offsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <View style={{ position: "relative" }}>
      {offsets.flatMap((dx) =>
        offsets.map((dy) => (
          <RNText
            key={`${dx},${dy}`}
            style={[
              style,
              {
                position: "absolute",
                left: dx,
                top: dy,
                color: "#000",
                opacity: 0.01,
              },
            ]}
          >
            {children}
          </RNText>
        ))
      )}

      {/* Text chính */}
      <RNText
        style={[
          style,
          {
            color: "rgba(255,255,255,0.15)",
          },
        ]}
      >
        {children}
      </RNText>
    </View>
  );
}
