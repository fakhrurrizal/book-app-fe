import axiosInterceptor from '@/config/axios.config';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { getApi } from '../constants';

export const useBookLending = (args: any) => {
  const { pageIndex, pageSize, searchValue, userID } = args;

  const query: Record<string, string | number> = {
    limit: Number(pageSize),
    page: Number(pageIndex),
  };

  if (searchValue) {
    query['search'] = searchValue;
  }

  if (userID) {
    query['user_id'] = userID;
  }

  const endpoint = queryString.stringifyUrl({
    url: getApi('book_lending'),
    query,
  });

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<any>(endpoint);

      return res.data;
    },
    queryKey: ['LIST_BOOK_LENDING', args],
  });
};

export const useBookLendingId = (id: any) => {
  let endpoint = '';
  if (id) {
    endpoint = queryString.stringifyUrl({
      url: getApi('book_lending') + '/' + id,
    });
  }

  return useQuery({
    queryFn: async () => {
      const res = await axiosInterceptor.get<any>(endpoint);

      return res.data?.data;
    },
    queryKey: ['LIST_BOOK_LENDING_ID', id],
  });
};
