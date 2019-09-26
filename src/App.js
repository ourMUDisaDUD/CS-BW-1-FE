import React from 'react';
import {Route} from "react-router";
import Game from './components/Game/Game';
import PrivateRoute from "./components/util/PrivateRoute";
import Onboard from './components/Onboard'
import StatusBar from './components/Game/StatusBar'
import './App.css'

function App() {
  return (
    <div className="App">
      <Route exact path = "/" render={(props) => <Onboard {...props}/>}/>
      <PrivateRoute path = "/game" component={Game}/>
      <Route exact path = "/test" component={StatusBar}/>
    </div>
  );
}

export default App;
