import { useState } from 'react';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import Form from './components/Form';
import Home from './components/Home';
import './App.css';

function App() {
  const [state, setState] = useState("HOME");

  return (
    <AppContainer>
      <Header title={"Welcome to 5 #react-typescript with #tailwindcss"} />
      {
      state === "HOME" ? 
        (<><Home/> <button className="mt-4 p-2 bg-gray-100 border-2 border-cyan-200 rounded-lg hover:bg-cyan-200 w-full" onClick={()=>setState("FORM")}>Open Form</button></>) : 
        (<><Form/> <button className="mt-4 p-2 bg-gray-100 border-2 border-cyan-200 rounded-lg hover:bg-cyan-200 w-full" onClick={()=>setState("HOME")}>Close Form</button></>)
      }
    </AppContainer>
  );
}

export default App;
