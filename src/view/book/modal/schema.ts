import * as z from 'zod';

export const BookSchema = z
  .object({
    author: z.string().min(1, { message: 'Nama Pengarang Wajib Diisi' }),
    book_code: z.string().min(1, { message: 'ISBN Wajib Diisi' }),
    category_id: z
      .object({
        id: z.number(),
        label: z.string(),
      })
      .nullable()
      .superRefine((data, context) => {
        if (!data) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Mohon pilih Kategori',
          });
        }
      }),
    description: z.string().min(1, { message: 'Sinopsis Wajib Diisi' }),
    image: z.any().optional(),
    language: z.string().min(1, { message: 'Bahasa Wajib Diisi' }),
    number_of_pages: z
      .string()
      .min(1, { message: 'Jumlah Halaman Wajib Diisi' }),
    stock: z.string().min(1, { message: 'Stock Wajib Diisi' }),
    publication_year: z
      .string()
      .min(1, { message: 'Tahun Terbit Wajib Diisi' }),
    publisher: z.string().min(1, { message: 'Penerbit Wajib Diisi' }),
    title: z.string().min(1, { message: 'Judul Wajib Diisi' }),
  })
  .transform((data) => {
    const newData: any = data;

    if (data?.category_id) {
      newData.category_id = data?.category_id.id;
    }

    newData.number_of_pages = Number(
      data?.number_of_pages?.replace(/[,.]/g, '')
    );
    newData.stock = Number(data?.stock?.replace(/[,.]/g, ''));
    newData.publication_year = Number(
      data?.publication_year?.replace(/[,.]/g, '')
    );

    return data;
  });

export type BookForm = z.infer<typeof BookSchema>;
