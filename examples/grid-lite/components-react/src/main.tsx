import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@highcharts/grid-lite/css/grid-lite.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

