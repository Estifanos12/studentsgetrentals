import axios, { AxiosInstance } from 'axios';
import { apiInterceptors } from '../interceptors/apiInterceptor';

const url = process.env.NEXT_PUBLIC_BASE_URL as string;
const customApiRequestAxiosClient = (endpoint: string) => {
  const apiClient: AxiosInstance = axios.create({
    baseURL: `${url}/${endpoint}`,
  });

  apiInterceptors(apiClient);

  return apiClient;
};

export default customApiRequestAxiosClient;
