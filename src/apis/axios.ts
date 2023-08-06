import axios from 'axios';

export const signAxios = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
  headers: {
    "Content-Type": "application/json",
  },
})

export const todoAxios = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
  headers: {
    'Content-Type': 'application/json',
  },
})

todoAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);