import { ConfigProvider } from 'antd';
import 'css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'configs/axios';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
