import { ConfigProvider } from 'antd';
import 'antd/dist/antd.dark.min.css';
import 'css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
