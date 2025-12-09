// app/(app)/home.tsx
import React from "react";
import { Text, View } from "react-native";
import ScreenContainer from "../../src/components/common/ScreenContainer";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-slate-100">
          Aquí se mostrarán los chats
        </Text>

        <Text className="text-slate-400 mt-2 text-center px-6">
          Esta pantalla aparecerá cuando inicies sesión correctamente.
          Aquí cargaremos la lista de conversaciones desde tu backend.
        </Text>
      </View>
    </ScreenContainer>
  );
}
