import axiosInterceptor from '@/config/axios.config';
import { getApi } from '@/utils';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export const useBookLending = () =>
  useMutation<AxiosResponse<any>, AxiosError<any>, any>({
    mutationFn: async (data) => {
      const res = await axiosInterceptor.post(getApi('book_lending'), data);

      return res.data;
    },

    mutationKey: ['BOOK_LENDING'],
  });

export const useBookLendingEdit = (id: any) =>
  useMutation<AxiosResponse<any>, AxiosError<any>, any>({
    mutationFn: async (data) => {
      const res = await axiosInterceptor.put(
        getApi('book_lending') + '/' + id,
        data
      );

      return res.data;
    },

    mutationKey: ['BOOK_LENDING'],
  });
