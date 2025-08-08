import axiosInterceptor from '@/config/axios.config';
import { getApi } from '@/utils';
import {
  RegisterPayload,
  UserProfileResponse,
} from '@/utils/api-response/auth';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

const endpointLogin = getApi('login');

export const useUserProfile = () =>
  useMutation<
    AxiosResponse<UserProfileResponse>,
    AxiosError<UserProfileResponse>,
    RegisterPayload
  >({
    mutationFn: async (data) => {
      const res = await axiosInterceptor.post(getApi('register'), data);

      return res.data;
    },

    mutationKey: ['REGISTER'],
  });
