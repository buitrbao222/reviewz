import 'configs/axios';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'css/index.css';
import App from './App';

const publicUrl =
  process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : undefined;

ReactDOM.render(
  <BrowserRouter basename={publicUrl}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
