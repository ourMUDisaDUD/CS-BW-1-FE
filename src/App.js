import React from 'react';
import {Route} from "react-router";
import Onboard from './components/Onboard'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route component={Onboard}/>
      </header>
    </div>
  );
}

export default App;
