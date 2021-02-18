import React from 'react';
import ReactDOM from 'react-dom';
import {MsalProvider} from '@azure/msal-react'
import {msalConfig} from './Constants/authConfig'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from '@azure/msal-browser';
import SiteLayout from './Components/SiteLayout';

const msalInstance = new PublicClientApplication(msalConfig)

ReactDOM.render(
  <React.StrictMode>
    <SiteLayout>
    </SiteLayout>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
