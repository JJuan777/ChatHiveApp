// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// TRANSFORMER: SVG + require.context
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  experimentalImportSupport: false,
  inlineRequires: true,
  unstable_allowRequireContext: true,
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

// NativeWind (Tailwind)
module.exports = withNativeWind(config, {
  input: "./global.css",
});
