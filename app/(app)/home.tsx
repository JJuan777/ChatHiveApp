import React from "react";
import { Text, View } from "react-native";
import ScreenContainer from "../../src/components/common/ScreenContainer";
import useAuth from "../../src/hooks/useAuth";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScreenContainer>
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-slate-100">
          Aquí se mostrarán los chats
        </Text>

        <Text className="text-slate-400 mt-2 text-center px-6">
          {user
            ? `Bienvenido, ${user.display_name || user.email}. Aquí cargaremos tus conversaciones cuando el chat esté listo.`
            : "Esta pantalla aparecerá cuando inicies sesión correctamente."}
        </Text>
      </View>
    </ScreenContainer>
  );
}
