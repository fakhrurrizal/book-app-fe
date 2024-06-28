import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInterceptor = axios.create();
axiosInterceptor.interceptors.response.use(
  function (response) {
    if (response.config.method === 'post') {
      const successMessage = response?.data?.message;
      if (successMessage) toast.success(successMessage);
    } else if (response.config.method === 'delete') {
      const successMessage = response?.data?.message;
      if (successMessage) toast.success(successMessage);
    } else if (response.config.method === 'put') {
      const successMessage = response?.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    return response;
  },
  function (error) {
    const statusCode = error?.response?.status;

    const MessageError = error.response?.data.error;

    console.log({ MessageError });

    const firstMessageError: string = Array.isArray(
      error.response?.data?.details
    )
      ? error.response?.data?.details?.[0]?.error
      : '';

    const secondMessageError: string = error.response?.data?.details;

    const thirdMessageError: string = error.response?.data?.message;
    if (MessageError == 'You have already signed in on another device.') {
      return Promise.reject(error);
    } else if (firstMessageError) {
      toast.error(firstMessageError);

      return Promise.reject(error);
    } else if (secondMessageError) {
      toast.error(secondMessageError);

      return Promise.reject(error);
    } else if (thirdMessageError) {
      toast.error(thirdMessageError);

      return Promise.reject(error);
    } else {
      toast.error(MessageError);

      return Promise.reject(error);
    }
  }
);

export default axiosInterceptor;
