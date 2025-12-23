import { useEffect } from "react";
import { Platform } from "react-native";

export const useNavigationBar = (hideOnMount = true) => {
  useEffect(() => {
    if (Platform.OS === "android") {
      const hideNavigationBar = () => {
        try {
          // For ALL Android versions - Force hide navigation bar
          if (Platform.Version >= 30) {
            // Android 11+ (API 30+)
            const { UIManager } = require("react-native");
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          } else {
            // Android 10 and below
            const { UIManager } = require("react-native");
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }

          // Additional navigation bar handling for all versions
          if (Platform.Version >= 21) {
            // Android 5.0+ (API 21+)
            const { NativeModules } = require("react-native");
            if (NativeModules.NavigationBarModule) {
              NativeModules.NavigationBarModule.setImmersiveMode(true);
            }
          }

          // Force hide navigation bar using multiple methods for all versions
          if (Platform.Version >= 21) {
            // For Android 5.0+, try to hide navigation bar
            const { UIManager } = require("react-native");
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
        } catch (error) {
          console.log("Navigation bar handling not available:", error.message);
        }
      };

      if (hideOnMount) {
        hideNavigationBar();

        // Also hide on focus/blur events
        const handleAppStateChange = () => {
          hideNavigationBar();
        };

        // Hide navigation bar when app becomes active for all versions
        if (Platform.Version >= 21) {
          const { AppState } = require("react-native");
          const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
              if (nextAppState === "active") {
                hideNavigationBar();
              }
            }
          );

          return () => subscription?.remove();
        }
      }
    }
  }, [hideOnMount]);

  return {
    hideNavigationBar: () => {
      if (Platform.OS === "android") {
        // Hide navigation bar manually if needed for all versions
        try {
          const { UIManager } = require("react-native");
          if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
          }
        } catch (error) {
          console.log("Manual navigation bar hide not available");
        }
      }
    },
  };
};
