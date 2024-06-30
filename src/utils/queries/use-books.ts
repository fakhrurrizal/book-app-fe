import axiosInterceptor from '@/config/axios.config';
import { BookId, BookResponse } from '@/types/book-response.types';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { getApi } from '../constants';

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

export const useBookId = (id: any) => {
  const endpoint = queryString.stringifyUrl({
    url: getApi('book') + '/' + id,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<BookId>(endpoint);

      return res.data?.data;
    },
    queryKey: ['LIST_BOOK_ID', id],
  });
};
