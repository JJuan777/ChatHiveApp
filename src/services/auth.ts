// src/services/auth.ts
import api from "./api";

export interface User {
  id: string;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  status_message?: string | null;
  last_seen?: string | null;
}

export interface LoginResponse {
  user: User;
  access: string;
  refresh: string;
}

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/api/auth/login/", {
    email,
    password,
  });
  return response.data;
}

export async function fetchMe(accessToken: string): Promise<User> {
  const response = await api.get<User>("/api/auth/me/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export async function logoutRequest(
  accessToken: string | null,
  refreshToken: string | null
): Promise<void> {
  try {
    await api.post(
      "/api/auth/logout/",
      { refresh: refreshToken },
      {
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : undefined,
      }
    );
  } catch {

  }
}
