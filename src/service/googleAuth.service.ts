/**
 * frontend/src/service/googleAuth.service.ts
 *
 * Envía el credential de Google al backend y recibe el JWT propio.
 */

import { httpClient } from './http.client';

export interface GoogleLoginResult {
  token:   string;
  email:   string;
  name?:   string;
  message: string;
}

export const googleLoginService = async (credential: string): Promise<GoogleLoginResult> => {
  try {
    const res = await httpClient.post('/api/Auth/google', { idToken: credential });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión con Google');
  }
};
