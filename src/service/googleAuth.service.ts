/**
 * frontend/src/service/googleAuth.service.ts
 *
 * Envía el credential de Google al backend y recibe el JWT propio.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface GoogleLoginResult {
  token:   string;
  email:   string;
  name?:   string;
  message: string;
}

export const googleLoginService = async (credential: string): Promise<GoogleLoginResult> => {
  const res = await fetch(`${API_URL}/api/auth/google`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ credential }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(err.message ?? 'Error al iniciar sesión con Google');
  }

  return res.json();
};