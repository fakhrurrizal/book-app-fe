import { AxiosError } from 'axios';
import { getApi } from '@/utils';
import { useMutation } from 'react-query';
import { ResponseLogin } from './login.response';
import { LoginForm } from './login.schemas';
import axiosInterceptor from '@/config/axios.config';

const endpointLogin = getApi('login');

export const useLoginMutation = () =>
  useMutation<ResponseLogin, AxiosError<ResponseLogin>, LoginForm>({
    mutationFn: async (data) => {
      const res = await axiosInterceptor.post<ResponseLogin>(
        endpointLogin,
        data
      );

      return res.data;
    },
    mutationKey: ['LOGIN'],
  });
