import React from "react"
//import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import {  Heading, Flex, Avatar, Box, HStack,Image,Link } from "@chakra-ui/react"

const Connections=props=>{


    return(
        <>
        <Flex>
            <Box w="28rem" p={4} bg="white.200">
                <HStack  spacing="3rem">
                 if({props.image}!=null){
                     <Image src={props.image} size="100%" rounded="1rem" shadow="2xl" />
                 }
                 else{
                     <Avatar name={props.name} src="https://bit.ly/broken-link" />
                 }   
                
                <Heading size="md" color="black.600">{props.name}</Heading>
                <Link color="blue.200" fontSize="md"href={props.plink}>
                        View
                    </Link>
        
                </HStack>
            </Box>
        </Flex>

    </>
    )
}
Connections.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    plink: PropTypes.string,
  }
  Connections.defaultProps =   {
      image:"null"
  }
  export default Connections  