import { AxiosInstance } from 'axios';
import { IApiRequest } from '../../types';
import customApiRequestAxiosClient from '../httpClient/apiClient';

export const apiRequest = async (data: IApiRequest) => {
  const axiosInstance: AxiosInstance = customApiRequestAxiosClient(
    data?.endpoint
  );

  const options = {
    method: data?.method,
    data: data?.data,
  };

  return axiosInstance(options);
};
