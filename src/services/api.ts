import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (githubToken && config.headers) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${githubToken}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return Promise.reject(new Error('Resource not found'));
      }
      if (status === 403) {
        return Promise.reject(new Error('Rate limit reached or forbidden'));
      }
      if (status >= 500) {
        return Promise.reject(new Error('GitHub service is unavailable'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
