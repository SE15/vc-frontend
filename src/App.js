import React from "react"
import { ChakraProvider } from "@chakra-ui/react"

import './App.css';
import ThemeToggler from "./components/ThemeToggler";
import Main from "./pages/Main";

function App() {
  return (
    <ChakraProvider>
      <ThemeToggler />
      <Main />
    </ChakraProvider>
  )
}

export default App;
