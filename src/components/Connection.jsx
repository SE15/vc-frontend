import {React,useState} from "react"
//import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import {  Heading, Flex, Avatar, Box, HStack,Image,Link } from "@chakra-ui/react"
import { kPrimaryBlackDark, kPrimaryGray }  from './../utils/constants'

function Connections(props){

    const [image, setImage] = useState(props.cimage);
    return(
        <>
        <Flex>
            <Box w="100%" p={4} bg="{kPrimaryGray}">
                <HStack  spacing="3rem">
                {props.cimage!=null?(
                     <Image src={props.cimage}  borderRadius="full" boxSize="3rem" />
                 
                 ) :(
                     <Avatar name={props.cname} src="https://bit.ly/broken-link" />
                 )
                }
                
                <Heading size="sm" color={kPrimaryBlackDark}>{props.cname}</Heading>
                <Link color="blue.200" fontSize="md"href={props.plink} textAlign="end">
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