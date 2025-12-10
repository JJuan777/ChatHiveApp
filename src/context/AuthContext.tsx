// src/context/AuthContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import {
    fetchMe,
    loginRequest,
    logoutRequest,
    User,
} from "../services/auth";

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const ACCESS_KEY = "@auth_access";
const REFRESH_KEY = "@auth_refresh";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar tokens del almacenamiento al iniciar
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [storedAccess, storedRefresh] = await Promise.all([
          AsyncStorage.getItem(ACCESS_KEY),
          AsyncStorage.getItem(REFRESH_KEY),
        ]);

        if (storedAccess && storedRefresh) {
          setAccessToken(storedAccess);
          setRefreshToken(storedRefresh);
          try {
            const me = await fetchMe(storedAccess);
            setUser(me);
          } catch {
            setAccessToken(null);
            setRefreshToken(null);
            setUser(null);
            await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
          }
        }
      } catch {
        // ignorar
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginRequest(email, password);

      setUser(data.user);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);

      await AsyncStorage.multiSet([
        [ACCESS_KEY, data.access],
        [REFRESH_KEY, data.refresh],
      ]);
    } catch (err: any) {
      console.error("login error", err?.response?.data || err?.message);
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.non_field_errors?.[0] ||
          "Error al iniciar sesión."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest(accessToken, refreshToken);
    } catch {

    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
  }, [accessToken, refreshToken]);

  const value: AuthContextValue = {
    user,
    accessToken,
    refreshToken,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
