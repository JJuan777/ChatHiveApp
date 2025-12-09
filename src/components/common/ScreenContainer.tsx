// src/components/common/ScreenContainer.tsx
import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

interface ScreenContainerProps {
  children: ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 px-6 py-8">{children}</View>
    </SafeAreaView>
  );
};

export default ScreenContainer;
