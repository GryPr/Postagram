import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Button } from '@material-ui/core';
import { loginRequest } from '../Constants/authConfig';
import React from 'react'

export default function AuthenticationButton() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  return (
    <Button
      onClick={
        isAuthenticated
          ? () => instance.logout()
          : () =>
            instance.acquireTokenPopup(loginRequest).then((response) => {
              console.log(response.idToken);
            })
      }
    >
      {isAuthenticated ? `Logout` : `Login/Register`}
    </Button>
  );
}