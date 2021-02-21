import {Component} from 'react';


function App(){
const data = { index: 0 };

fetch('https://soen341v2.azurewebsites.net/public', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
})};

export default App;