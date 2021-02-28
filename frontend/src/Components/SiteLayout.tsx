import './SiteLayout.css';
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
} from '@material-ui/core';
  <link href="http://fonts.cdnfonts.com/css/billabong" rel="stylesheet"></link>

type SiteLayoutProps = {
  children: React.ReactNode;
};

const SiteLayout: React.FunctionComponent<SiteLayoutProps> = ({ children }) => (
  <div>
    <AppBar id="appbar">
      <Toolbar id="toolbar">
        <Button id="logo" >Instagram</Button>
        <InputBase id="searchbar" placeholder="Search" />
        <SearchIcon id="searchicon"></SearchIcon>
        <div>
          <Button><HomeIcon id="homeicon"></HomeIcon></Button>
          <Button><AccountCircleOutlinedIcon id="homeicon"></AccountCircleOutlinedIcon></Button>
        </div>
      </Toolbar>
    </AppBar>
    <>{children}</>
  </div>
);

export default SiteLayout;
