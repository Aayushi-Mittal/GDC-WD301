import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const divContainer = React.createElement(
//   'div',
//   { className: 'flex h-screen bg-gray-100 items-center' },
//   React.createElement(
//     'h1',
//     { className: 'text-center text-xl' },
//     'Welcome to #react-typescript with #tailwindcss'
//   ),
// )

// ReactDOM.render(
//   divContainer,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
