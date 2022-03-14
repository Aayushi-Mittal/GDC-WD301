import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';

function App() {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl">
        <div className="flex items-center">
          <img src={logo} className="w-20 h-20 animate-spin" alt="logo" />
          <h1 className="text-center text-xl pt-2">Welcome to #react-typescript with #tailwindcss </h1>
        </div>
        <Form/>
      </div>
    </div>
  );
}

export default App;
