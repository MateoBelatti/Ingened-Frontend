import { httpClient } from "./http.client";
import type { User } from "../types/user.types";

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const res = await httpClient.get("/api/User"); 
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al obtener los usuarios");
    }
  }
};
