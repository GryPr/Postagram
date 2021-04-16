import { useIsAuthenticated } from "@azure/msal-react";
import { Button } from "@material-ui/core";
import { useCallback } from "react";
import { useHistory } from "react-router"; import "./authenticationButton.css";

export default function AuthenticationButton() {
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();
  const goToAzureLoginAdRedirect = useCallback(() => history.push('/azureAdLoginRedirect'), [history])
  const goToAzureLogoutAdRedirect = useCallback(() => history.push('/azureAdLogoutRedirect'), [history])

  return (
    <Button id='login'
      variant="contained"
      component="label"
      onClick={isAuthenticated ? goToAzureLogoutAdRedirect : goToAzureLoginAdRedirect}
    >
      {isAuthenticated ? `Logout` : `Login/Register`}
    </Button>
  );
}
