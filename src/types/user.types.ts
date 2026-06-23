export interface User {
  id: number;
  nombre: string;
  email: string;
  ultimaConeccion?: string | null;
  googleId?: string | null;
}
