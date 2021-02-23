import React from "react";
import ReactDOM from "react-dom";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./Constants/authConfig";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PublicClientApplication } from "@azure/msal-browser";
import SiteLayout from "./Components/SiteLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MsalProvider instance={msalInstance}>
        <SiteLayout>
          {" "}
          <App />
        </SiteLayout>
      </MsalProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
