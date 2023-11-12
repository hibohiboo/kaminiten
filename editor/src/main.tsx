import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesApp } from './router/RoutesApp.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <React.StrictMode>
      <RoutesApp />
    </React.StrictMode>
  </Provider>,
);
