import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticationButton from '../authenticationButton';

it("render authentication button", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthenticationButton />, div)
})