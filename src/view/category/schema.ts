import * as z from 'zod';

export const BookCategorySchema = z.object({
  description: z.string().min(1, { message: 'Keterangan Wajib Diisi' }),
  name: z.string().min(1, { message: 'Nama Wajib Diisi' }),
  icon: z.string().min(1, { message: 'Icon Wajib Diisi' }),
});

export type BookCategorySchemaForm = z.infer<typeof BookCategorySchema>;
