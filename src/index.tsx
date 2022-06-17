import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import './Config/i18n/i18n.ts';

import Amplify, { API, Auth } from 'aws-amplify';
import awsExports from './Config/aws/aws-exports';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';

Amplify.configure(awsExports);
// Auth.configure(awsExports);
// API.configure(awsExports);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signIn" element={<Login />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/verifyEmail" element={<VerifyEmail />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
