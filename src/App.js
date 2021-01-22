import React from "react"
import { ChakraProvider, Box } from "@chakra-ui/react"

import './App.css';
import Footer from "./components/Footer";
import Main from "./pages/Main";

function App() {
  return (
    <ChakraProvider>
      <Main />
      <Footer />
    </ChakraProvider>
  )
}

export default App;
