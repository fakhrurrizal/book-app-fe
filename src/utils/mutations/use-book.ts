import axiosInterceptor from '@/config/axios.config';
import { BookResponse } from '@/types/book-response.types';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { getApi } from '../constants';

export const useAddBook = () => {
  return useMutation<
    AxiosResponse<BookResponse>,
    AxiosError<BookResponse>,
    any
  >({
    mutationFn: async (data) =>
      await axiosInterceptor.post<BookResponse>(getApi('book'), data),
    mutationKey: ['ADD_BOOK'],
  });
};

export const useEditBook = (id: any) => {
  return useMutation<
    AxiosResponse<BookResponse>,
    AxiosError<BookResponse>,
    any
  >({
    mutationFn: async (data) =>
      await axiosInterceptor.put<BookResponse>(getApi('book') + '/' + id, data),
    mutationKey: ['EDIT_BOOK'],
  });
};

export const useDeleteBook = (id: any) => {
  return useMutation<AxiosResponse<BookResponse>, AxiosError<BookResponse>>({
    mutationFn: async () =>
      await axiosInterceptor.delete<BookResponse>(getApi('book') + '/' + id),
    mutationKey: ['DELETE_BOOK'],
  });
};
