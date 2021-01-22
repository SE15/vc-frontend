import React from 'react';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';

import ThemeToggler from './components/ThemeToggler';

import ProfileSettings from './pages/ProfileSettings';
//import ChangePassword from './pages/ChangePassword';
//import DeleteAccount from './pages/DeleteAccount';


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ThemeToggler />
        
        <ProfileSettings />

      </ColorModeProvider>
    </ThemeProvider>
  );
}
