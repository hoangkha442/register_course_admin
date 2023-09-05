import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import spinnerSlice from './redux/spinnerSlice';
import { BrowserRouter } from 'react-router-dom';
import adminSlice from './redux/adminSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let storeAdmin = configureStore({
  reducer: {
    adminSlice,
    spinnerSlice,
  },
});
root.render(
  <BrowserRouter >
    <Provider store={storeAdmin}>
    <App />
  </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
