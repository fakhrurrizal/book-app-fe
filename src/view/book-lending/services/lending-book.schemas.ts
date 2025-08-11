import dayjs from 'dayjs';
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
      .nullable()
      .optional(),
    borrow_date: z.string().optional(),
    return_date: z.string().optional(),
    due_date: z.string().optional(),
  })
  .transform((data) => {
    const newData: any = data;

    newData.status = data.status?.id;

    newData.borrow_date = dayjs(data.borrow_date).format('YYYY-MM-DD');
    newData.return_date = dayjs(data.return_date).format('YYYY-MM-DD');
    newData.due_date = dayjs(data.due_date).format('YYYY-MM-DD');

    return data;
  });

export type BookLendingFormData = z.infer<typeof bookLendingSchema>;
