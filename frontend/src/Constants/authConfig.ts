import {
    Configuration,
    PopupRequest,
  } from '@azure/msal-browser';
  
  // Config object to be passed to Msal on creation
  export const msalConfig: Configuration = {
    auth: {
      clientId: `6559ef2b-deb7-4c80-a796-e32e087fbc75`,
      authority: `https://grypr.b2clogin.com/grypr.onmicrosoft.com/B2C_1_1`,
    },
    cache: {
      cacheLocation: `localStorage`,
      storeAuthStateInCookie: true,
    },
  };
  
  // Add here scopes for id token to be used at MS Identity Platform endpoints.
  export const loginRequest: PopupRequest = {
    scopes: ['openid',  'offline_access', 'https://grypr.onmicrosoft.com/soen341/read'],
  };