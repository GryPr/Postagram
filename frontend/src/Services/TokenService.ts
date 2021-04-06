import { useAccount, useMsal } from "@azure/msal-react";
import { loginRequest } from "../Constants/authConfig";
import {
  InteractionRequiredAuthError,
  SilentRequest,
} from "@azure/msal-browser";

export function GetAccessToken(): string {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {})!;
  const silentRequest: SilentRequest = {
    account: account,
    ...loginRequest,
  };

  instance
    .acquireTokenSilent(silentRequest)
    .then((response) => {
      if (response.accessToken) {
        return response.accessToken;
      }
    })
    .catch(async (error) => {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        instance.acquireTokenPopup(silentRequest).then((response) => {
          return response.accessToken;
        });
      }
    });

  return "";
}