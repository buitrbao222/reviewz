import axios from 'axios';
import { STORAGE_KEYS } from 'configs/constants';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

axios.interceptors.request.use(async config => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  config.headers = {
    Authorization: token ? `Bearer ${token}` : '',
  };

  return config;
});

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);
