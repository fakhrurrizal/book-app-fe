import * as z from 'zod';

export const BookCategorySchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, { message: 'Nama Wajib Diisi' }),
  icon: z.string().min(1, { message: 'Icon Wajib Diisi' }),
  status: z.boolean(),
});

export type BookCategorySchemaForm = z.infer<typeof BookCategorySchema>;
