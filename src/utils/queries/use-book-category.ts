import axiosInterceptor from '@/config/axios.config';
import {
  BookCategoryId,
  BookCategoryResponse,
} from '@/types/category-response.types';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { getApi } from '../constants';

export const useBookCategoory = (args: any) => {
  const { pageIndex, pageSize, searchValue,  } = args;

  const query: Record<string, string | number> = {
    limit: Number(pageSize),
    page: Number(pageIndex),
  };

  if (searchValue) {
    query['search'] = searchValue;
  }

  const endpoint = queryString.stringifyUrl({
    url: getApi('book_category'),
    query,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<BookCategoryResponse>(endpoint);

      return res.data;
    },
    queryKey: ['LIST_BOOK_CATEGORY', args],
  });
};

export const useBookCategoryId = (id: any) => {
  const endpoint = queryString.stringifyUrl({
    url: getApi('book_category') + '/' + id,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<BookCategoryId>(endpoint);

      return res.data?.data;
    },
    queryKey: ['LIST_BOOK_CATEGORY_ID', id],
  });
};
