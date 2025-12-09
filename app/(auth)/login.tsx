// app/(auth)/login.tsx
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Contenedor base con fondo oscuro y padding
import ScreenContainer from "../../src/components/common/ScreenContainer";

// SVG del logo
import LogoS from "../../assets/LogoS.svg";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center">
            {/* HEADER: Logo + título */}
            <View className="mb-8 items-center">
              {/* Logo */}
              <LogoS width={90} height={90} />

              {/* Título */}
              <Text className="mt-4 text-3xl font-extrabold text-slate-50">
                ChatHive
              </Text>

              <Text className="mt-2 text-sm text-slate-400 text-center">
                Inicia sesión para entrar a tu panel de conversación.
              </Text>
            </View>

            {/* CARD LOGIN */}
            <View className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 shadow-2xl">
              <Text className="text-lg font-semibold text-slate-100">
                Bienvenido de vuelta
              </Text>
              <Text className="mt-1 mb-4 text-xs text-slate-400">
                Usa tu correo corporativo y contraseña.
              </Text>

              {/* Correo */}
              <View className="mb-4">
                <Text className="mb-1 text-[11px] font-medium text-slate-300">
                  Correo electrónico
                </Text>
                <TextInput
                  className="h-11 rounded-full border border-slate-700 bg-slate-950 px-4 text-sm text-slate-50"
                  placeholder="tucorreo@ejemplo.com"
                  placeholderTextColor="#6b7280"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Contraseña */}
              <View className="mb-2">
                <Text className="mb-1 text-[11px] font-medium text-slate-300">
                  Contraseña
                </Text>
                <TextInput
                  className="h-11 rounded-full border border-slate-700 bg-slate-950 px-4 text-sm text-slate-50"
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Botón (solo diseño) */}
              <TouchableOpacity className="mt-3 h-11 items-center justify-center rounded-full bg-blue-600 active:bg-blue-500">
                <Text className="text-sm font-semibold text-slate-50">
                  Ingresar
                </Text>
              </TouchableOpacity>

              {/* Links */}
              <View className="mt-4 flex-row items-center justify-end space-x-1">
                <Text className="text-[11px] text-slate-500">
                  ¿Olvidaste tu contraseña?
                </Text>
                <TouchableOpacity>
                  <Text className="text-[11px] font-semibold text-blue-400">
                    Recuperar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* FOOTER */}
            <Text className="mt-6 text-center text-[11px] text-slate-500">
              © {new Date().getFullYear()} ChatHive · Todos los derechos
              reservados.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
