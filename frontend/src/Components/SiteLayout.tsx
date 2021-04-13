import "./SiteLayout.css";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { AppBar, Toolbar, Button, Grid, InputBase } from "@material-ui/core";
import AuthenticationButton from "./authenticationButton";
import { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";

type SiteLayoutProps = {
  children: React.ReactNode;
};

const SiteLayout: React.FunctionComponent<SiteLayoutProps> = ({ children }) => {
  const history = useHistory();
  const goToCreate = useCallback(() => history.push('/create'), [history]);
  const goToHome = useCallback(() => history.push('/'), [history]);
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <AppBar id="appbar" position="sticky">
        <Toolbar id="toolbar">
          <Button id="logo" onClick={goToHome}>Postagram</Button>
          <InputBase id="searchbar" placeholder="Search" />
          <div>
            <Button>
              <HomeIcon id="homeicon"></HomeIcon>
            </Button>
            <Button>
              <AccountCircleOutlinedIcon id="homeicon"></AccountCircleOutlinedIcon>
            </Button>
            <Grid justify="flex-end" container>
              {isAuthenticated ?
                <Button
                  id='postimage'
                  variant="contained"
                  component="label"
                  onClick={goToCreate}>
                  Post Image
            </Button> :
                <div></div>}
              <div id='button'>
                <AuthenticationButton />
              </div>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <>{children}</>
    </div>
  );
}

export default SiteLayout;
