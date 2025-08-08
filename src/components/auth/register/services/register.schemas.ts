import { z } from 'zod';

const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email wajib diisi')
      .email('Silakan masukkan alamat email yang valid'),

    fullname: z.string().min(1, 'Nama lengkap wajib diisi'),

    phone: z
      .string()
      .min(1, 'Nomor telepon wajib diisi')
      .regex(
        /^[8][\d-]+$/,
        'Masukkan nomor diawali angka 8 dan hanya berisi angka atau tanda hubung'
      )
      .refine(
        (val) => {
          const cleaned = val.replace(/[^0-9]/g, '');

          return cleaned.length >= 9 && cleaned.length <= 12;
        },
        {
          message:
            'Nomor telepon harus terdiri dari 9–12 digit angka (tidak termasuk angka 0 di depan)',
        }
      ),
    password: z
      .string()
      .min(8, 'Kata sandi minimal terdiri dari 8 karakter')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka'
      ),

    confirm_password: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Kata sandi dan konfirmasi tidak cocok',
    path: ['confirm_password'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
