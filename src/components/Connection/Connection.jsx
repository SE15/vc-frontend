import { React } from "react"
//import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { Text, Avatar, HStack, Button, Spacer, ReactRouterLink } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';


function Connections({ name, link, image }) {

    return (
        <HStack 
        overflow="hidden" 
        w="100%" 
        h="70px" 
        borderWidth="1px" 
        borderRadius="lg" 
        px={4} 
        py={2} 
        bg="purple.100" 
        boxShadow="lg" 
        spacing={4}
        minWidth="350px">
            <Avatar name={name} src={image} />
            <Text color="gray.700" fontWeight={500} align="center" fontSize={17}>{name}</Text>
            <Spacer />
            <Link as={ReactRouterLink} to={link}>
                <Button leftIcon={<ExternalLinkIcon/>} variant="link" colorScheme="blue" pb={1}>view</Button>
            </Link>
        </HStack>
    )
}

Connections.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
}
Connections.defaultProps = {
    image: "null"
}
export default Connections  