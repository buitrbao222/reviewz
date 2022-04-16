import '@ant-design/flowchart/dist/index.css';
import 'configs/axios';
import 'css/index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const publicUrl =
  process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : undefined;

ReactDOM.render(
  <BrowserRouter basename={publicUrl}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
