import React from "react";
import "./App.css";
import ImageUpload from "./Components/ImageUpload/imageUpload";
import ImageList from "./Components/ImageList/imageList";
import { Route, Switch } from "react-router-dom";
import UserProfile from "./Components/UserProfile/userProfile";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/" exact component={ImageList} />
          <Route path="/create" exact component={ImageUpload} />
          <Route path="/user/:userId" component={UserProfile} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
