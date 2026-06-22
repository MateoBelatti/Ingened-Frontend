import { httpClient } from "./http.client";

export const loginService = async (data: { email: string; password: string }) => {
  try {
    const res = await httpClient.post("/api/Auth/login", data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en login");
  }
};
