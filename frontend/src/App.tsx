import React from "react";
import "./App.css";
import ImageUpload from "./Components/ImageUpload/imageUpload";
import ImageList from "./Components/ImageList/imageList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ImageList />
        <ImageUpload />
      </header>
    </div>
  );
}

export default App;
