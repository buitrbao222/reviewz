import axios from 'axios';
import { STORAGE_KEYS } from 'configs/constants';
import useUserStore from 'store/userStore';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  config.headers = {
    Authorization: token ? `Bearer ${token}` : '',
  };

  const method = config.method.toUpperCase();

  console.log(`${method.toUpperCase()} REQUEST ${config.url}`, config);

  return config;
});

axios.interceptors.response.use(
  response => {
    const {
      config: { method, url },
      data,
    } = response;

    console.log(`${method.toUpperCase()} RESPONSE DATA ${url}`, data);

    return data;
  },
  error => {
    const {
      config: { method, url },
      data,
    } = error.response;

    console.log(`${method.toUpperCase()} RESPONSE ERROR ${url}`, data);

    if (data.message === 'Token invalid') {
      useUserStore.getState().logout();
    }

    return Promise.reject(data);
  }
);
