import { InteractionRequiredAuthError, SilentRequest } from "@azure/msal-browser";
import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "@material-ui/core";
import { loginRequest } from "../Constants/authConfig";
import { backendURL } from "../Constants/backendConfig";

export default function AuthenticationButton() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {})!;

  async function getAccessToken() {
    const silentRequest: SilentRequest = {
      account: account,
      ...loginRequest,
    };
    try {
      const resp = await instance
        .acquireTokenSilent(silentRequest);
      if (resp.accessToken) {
        return resp.accessToken;
      }
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        instance.acquireTokenPopup(silentRequest).then((response) => {
          return response.accessToken
        });
      }
    }
  }

  async function sendUser(accessToken: string) {

    fetch(backendURL + "/user", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        console.log(response)
      })
  }

  return (
    <Button
      variant="contained"
      component="label"
      onClick={
        isAuthenticated
          ? () => instance.logout()
          : () =>
            instance.acquireTokenPopup(loginRequest).then((response) => {
              sendUser(response.accessToken);
            })
      }
    >
      {isAuthenticated ? `Logout` : `Login/Register`}
    </Button>
  );
}
