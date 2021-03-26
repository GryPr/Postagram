import React from "react";
import "./App.css";
import ImageUpload from "./Components/ImageUpload/imageUpload";
import ImageList from "./Components/ImageList/imageList";
import { Route, Switch } from "react-router-dom";
import UserProfile from "./Components/UserProfile/userProfile";
import AuthenticationProvider from "./Components/AuthenticationProvider/authenticationProvider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthenticationProvider>
          <Switch>
            <Route path="/" exact component={ImageList} />
            <Route path="/create" exact component={ImageUpload} />
            <Route path="/user/:userId" component={UserProfile} />
          </Switch>
        </AuthenticationProvider>
      </header>
    </div>
  );
}

export default App;
