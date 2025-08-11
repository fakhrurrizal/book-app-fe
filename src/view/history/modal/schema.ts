import * as z from 'zod';

export const BookCategorySchema = z.object({
  description: z.string().min(1, { message: 'Keterangan Wajib Diisi' }),
  name: z.string().min(1, { message: 'Nama Wajib Diisi' }),
  icon: z.string().min(1, { message: 'Icon Wajib Diisi' }),
});

export const BookCategoryFilterSchema = z
  .object({
    sort: z.object({
      id: z.string().optional(),
      label: z.string().optional(),
    }),
    user_id: z.object({
      id: z.string().optional(),
      label: z.string().optional(),
    }),
    order: z.object({
      id: z.string().optional(),
      label: z.string().optional(),
    }),
  })
  .transform((data) => {
    const newData: any = data;

    if (data.order) {
      newData.order = data.order.id;
    }

    if (data.sort) {
      newData.sort = data.sort.id;
    }

    if (data.user_id) {
      newData.user_id = data.user_id.id;
    }

    return data;
  });

export type BookCategoryFilterForm = z.infer<typeof BookCategoryFilterSchema>;

export type BookCategorySchemaForm = z.infer<typeof BookCategorySchema>;
