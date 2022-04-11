import axios from 'axios';
import { STORAGE_KEYS } from 'configs/constants';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

axios.interceptors.request.use(config => {
  const method = config.method.toUpperCase();
  console.log(`${method.toUpperCase()} REQUEST ${config.url}`);

  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  config.headers = {
    Authorization: token ? `Bearer ${token}` : '',
  };

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

    return Promise.reject(data);
  }
);
