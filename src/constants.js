import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    blueGreen: {
      100:"#80ccc4",  
      200: "#07c3c0",
      300:"#62f6f3",
      400:"#009290",
      900:"#4f9b94"
    },
    black:{
      400:"#373535",
      500:"#615f5f",
      600:"#110f0f",
      700:"#fafafa",
      900: "#aeaeae"
    },
    white:{
       100:"#f5f5f5",
       200:"#e0e0e0" 
    },
    blue:{
      100:"#7986CB"
    }  

    },
  fonts:{
    
    body: "'My Body Font',Sans-serif",
    heading: "'My Heading Font', 'Copperplate'",
    mono: "'My Monospaced Font', monospace",
  },
  textStyles: {
    h1: {
   
      fontSize: "100px",
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: "15px",
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  }  
  }
)

export default theme;
