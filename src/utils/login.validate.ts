import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'El correo es obligatorio').email('Correo inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
}); 