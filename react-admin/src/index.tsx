import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api/admin/" ;
axios.defaults.withCredentials = true;
const matchResult = document.cookie.match(/csrftoken=([^;]+)/);

// Check if matchResult is not null before accessing its properties
const csrftoken = matchResult ? matchResult[1] : null;

// Include the CSRF token in the headers if it's not null
if (csrftoken) {
   axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
