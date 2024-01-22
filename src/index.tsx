import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <App />
    <Analytics></Analytics>
  </React.StrictMode>
);
