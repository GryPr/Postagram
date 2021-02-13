import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal, useAccount } from '@azure/msal-react';
import { Button } from '@material-ui/core';
import { loginRequest } from '../Constants/authConfig';
import { useState } from 'react';

const ProfileContent = () => {};

export default function AuthenticationButton() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const [token, setToken] = useState('');

  function getToken() {
    instance
      .acquireTokenSilent(loginRequest)
      .then((tokenResponse) => {
        // Do something with the tokenResponse
      })
      .catch(async (error) => {
        if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return instance.acquireTokenPopup(loginRequest);
        }
      });
  }

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