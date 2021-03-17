import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "@material-ui/core";
import { loginRequest } from "../Constants/authConfig";
import { backendURL } from "../Constants/backendConfig";

export default function AuthenticationButton() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

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
