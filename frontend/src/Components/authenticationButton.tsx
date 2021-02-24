import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "@material-ui/core";
import { loginRequest } from "../Constants/authConfig";

export default function AuthenticationButton() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  return (
    <Button
      variant="contained"
      component="label"
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
