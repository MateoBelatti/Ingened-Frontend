import { httpClient } from "./http.client";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginService = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  try {
    const res = await httpClient.post("/api/Auth/login", data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en login");
  }
};

export const refreshTokenService = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    const res = await httpClient.post("/api/Auth/refresh", { refreshToken });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al refrescar el token");
  }
};
