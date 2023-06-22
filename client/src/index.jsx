import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { ToastContext } from 'context/toastContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ToastContext>
      <App />
    </ToastContext>
  </React.StrictMode>,
  document.getElementById('root'),
);
