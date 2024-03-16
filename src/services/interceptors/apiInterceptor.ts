import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const apiInterceptors = (apiClient: AxiosInstance) => {
  const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['X-Client'] = 'React';
    return config;
  };

  apiClient.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('token')!);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      requestInterceptor(config);
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (err) => {
      if (err.response?.status === 401) {
        console.log('Unauthorized');
      } else return Promise.reject(err);
    }
  );
};
