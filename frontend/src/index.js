import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.withCredentials = true;

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
