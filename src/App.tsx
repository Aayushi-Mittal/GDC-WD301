import { useState } from 'react';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import Form from './components/Form';
import Home from './components/Home';
import './App.css';

function App() {
  const [state, setState] = useState("HOME");
  
  const openForm = () => {
    setState("FORM");
  }
  const closeForm = () => {
    setState("HOME");
  }

  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 5, label: "Phone Number", type: "tel" },
  ];
  

  return (
    <AppContainer>
      <Header title={"Welcome to 5 #react-typescript with #tailwindcss"} />
      {
      state === "HOME" ? 
        (<Home openFormCB={openForm}/>) : 
        (<Form closeFormCB={closeForm} formFields={formFields}/>)
      }
    </AppContainer>
  );
}

export default App;
