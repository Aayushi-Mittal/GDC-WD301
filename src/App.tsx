import React from 'react';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <AppContainer>
      <Header title={"Welcome to 5 #react-typescript with #tailwindcss"}/>
      <Form/>
    </AppContainer>
  );
}

export default App;
