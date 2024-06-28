export interface BookCategoryResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  error: string;
  status: number;
  message: string;
  data: BookCategory[];
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

export interface BookCategory {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  icon: string;
  status: boolean;
}

export interface BookCategoryId {
  data: BookCategory;
}