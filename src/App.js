import React from "react"
import { ChakraProvider } from "@chakra-ui/react"

import './App.css';
import ThemeSelector from "./components/ThemeToggler";
import Main from "./pages/Main";

function App() {
  return (
    <ChakraProvider>
      <ThemeSelector />
      <Main />
    </ChakraProvider>
  )
}

export default App;
