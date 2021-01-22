import React from 'react';
import './App.css';
import TempScreen from './pages/TempScreen';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <TempScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
