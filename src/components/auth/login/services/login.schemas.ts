import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid'),
  password: z.string().min(3, 'Password wajib diisi'),
});

export type LoginForm = z.infer<typeof loginSchema>;
