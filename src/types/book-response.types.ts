export interface BookResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  error: string;
  status: number;
  message: string;
  data: DataBook[];
  search: string;
  next: boolean;
  back: boolean;
  limit: number;
  offset: number;
  total_page: number;
  current_page: number;
  sort: string;
  order: string;
}

export interface DataBook {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  author: string;
  book_code: string;
  publisher: string;
  image: string;
  publication_year: number;
  languange: string;
  description: string;
  number_of_pages: number;
  status: boolean;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
}
