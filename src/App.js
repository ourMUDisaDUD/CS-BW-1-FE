import React from 'react';
import {Route} from "react-router";
import Game from './components/Game/Game';
import PrivateRoute from "./components/PrivateRoute";
import Onboard from './components/Onboard'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path = "/" render={(props) => <Onboard {...props}/>}/>
        <PrivateRoute path = "/game" component={Game}/>
      </header>
    </div>
  );
}

export default App;
