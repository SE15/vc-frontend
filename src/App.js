import React from "react"
import { ChakraProvider } from "@chakra-ui/react"

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";

function App() {
  return (
    <ChakraProvider>
      <Header/>
      <Main />
      <Footer />
    </ChakraProvider>
  )
}

export default App;
