import "./SiteLayout.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { AppBar, Toolbar, Button, InputBase, Grid } from "@material-ui/core";
import AuthenticationButton from "./authenticationButton";
import { useCallback } from "react";
import { useHistory } from 'react-router-dom';
<link href="http://fonts.cdnfonts.com/css/billabong" rel="stylesheet"></link>;

type SiteLayoutProps = {
  children: React.ReactNode;
};

const SiteLayout: React.FunctionComponent<SiteLayoutProps> = ({ children }) => {
  const history = useHistory();
  const goToCreate = useCallback(() => history.push('/create'), [history]);
  const goToHome = useCallback(() => history.push('/'), [history]);


  return (
    <div>
      <AppBar id="appbar" position="sticky">
        <Toolbar id="toolbar">
          <Button id="logo" onClick={goToHome}>Instagram</Button>
          {/* <InputBase id="searchbar" placeholder="Search" />
        <SearchIcon id="searchicon"></SearchIcon>
        <div>
          <Button>
            <HomeIcon id="homeicon"></HomeIcon>
          </Button>
          <Button>
            <AccountCircleOutlinedIcon id="homeicon"></AccountCircleOutlinedIcon>
          </Button>
        </div> */}
          <Grid justify="flex-end" container>
            <Button
              id='button'
              variant="contained"
              component="label"
              onClick={goToCreate}>
              Post Image
            </Button>
            <div id='button'>
              <AuthenticationButton />
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <>{children}</>
    </div>
  );
}

export default SiteLayout;
