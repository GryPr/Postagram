import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './../userProfile';
import userProfile from './../userProfile';

it ("renders without crashing", () => {

const div = document.createElement("div");
ReactDOM.render(<UserProfile></UserProfile>,div)
})


