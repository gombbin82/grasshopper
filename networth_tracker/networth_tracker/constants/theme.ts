/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
const tintColorLight = '#007AFF'; // Our app's blue accent
const tintColorDark = '#007AFF'; // Our app's blue accent

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076', // A standard gray
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    
    // --- Add these new colors ---
    secondaryBackground: '#F0F0F0', // Card background for light mode
    buttonBackground: '#E0E0E0',     // Button background for light mode
    subtleText: '#8e8e93',          // For grayed-out text
    progressBarBackground: '#E0E0E0',
    chartLine: '#333',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    icon: '#9BA1A6', // A standard gray
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // --- Add these new colors ---
    secondaryBackground: '#1C1C1E', // Card background for dark mode
    buttonBackground: '#2C2C2E',     // Button background for dark mode
    subtleText: '#8e8e93',          // For grayed-out text
    progressBarBackground: '#2C2C2E',
    chartLine: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
