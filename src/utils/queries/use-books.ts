import { useQuery } from 'react-query';
import { getApi } from '../constants';
import axiosInterceptor from '@/config/axios.config';
import { BookResponse } from '@/types/book-response.types';
import queryString from 'query-string';

export const useBook = (args: any) => {
  const { pageIndex, pageSize, search, sort, order, categoryId } = args;

  const query: Record<string, string | number> = {
    limit: Number(pageSize),
    page: Number(pageIndex),
  };

  if (search) {
    query['search'] = search;
  }

  if (sort) {
    query['sort'] = sort;
  }

  if (order) {
    query['order'] = order;
  }

  if (categoryId) {
    query['category_id'] = categoryId;
  }

  const endpoint = queryString.stringifyUrl({
    url: getApi('book'),
    query,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<BookResponse>(endpoint);

      return res.data;
    },
    queryKey: ['LIST_BOOK', args],
    refetchOnWindowFocus: false,
  });
};
