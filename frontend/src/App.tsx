import React from "react";
import "./App.css";
import ImageUpload from "./Components/ImageUpload/imageUpload";
import ImageList from "./Components/ImageList/imageList";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route path="/" exact component={ImageList} />
        <Route path="/create" exact component={ImageUpload} />
      </header>
    </div>
  );
}

export default App;
