// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Expo + NativeWind
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Sin plugins para nativewind 
    // plugins: [],
  };
};
