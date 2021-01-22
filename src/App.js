import React from 'react';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';
import ThemeToggler from './components/ThemeToggler';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import TempScreen from './pages/TempScreen';
import ProfileSettings from './pages/ProfileSettings';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <ThemeToggler />
            <Route path="/" exact>
              <TempScreen />
            </Route>
            <Route path="/settings" exact>
              <ProfileSettings />
            </Route>
          </ColorModeProvider>
        </ThemeProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
