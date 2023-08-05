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
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  },
})