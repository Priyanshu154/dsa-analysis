import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css'

ReactDOM.render(
  
  <>
  <BrowserRouter>
    <App 
     csrf = {document.getElementById('csrf').getElementsByTagName('input')[0].value}
     error = { document.getElementById('form_errors').innerHTML }
     userLoggedIn = { (document.getElementById('userAuthenticated').innerHTML) === 'false' ? false : true }
     username = { document.getElementById('username').innerHTML }
    />
  </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
