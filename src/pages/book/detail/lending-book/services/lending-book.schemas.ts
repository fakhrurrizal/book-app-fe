import { z } from 'zod';

export const bookLendingSchema = z
  .object({
    notes: z.string().optional(),
    user_id: z.number().optional(),
    book_id: z.number().optional(),
    status: z
      .object({
        id: z.string().optional(),
        label: z.string().optional(),
      })
      .nullable(),
    borrow_date: z.string().optional(),
    return_date: z.string().optional(),
    due_date: z.string().optional(),
  })
  .transform((data) => {
    const newData: any = data;

    if (data.status) {
      newData.status = data.status.id;
    }

    return data;
  });

export type BookLendingFormData = z.infer<typeof bookLendingSchema>;
