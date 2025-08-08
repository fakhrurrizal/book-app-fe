export interface PaginationArgs<T = any> {
  pageIndex?: number;
  searchValue?: string;
  pageSize?: number;
  sort?: Order;
  order?: keyof T;
  status?: any;
  bookCategory?: string;
  roleID?: number;
}

export type Order = 'desc' | 'asc';
