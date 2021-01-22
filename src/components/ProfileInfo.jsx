import React from 'react';

import logo from '../assets/logo.png';
import { Image, Button, Box, Heading, Text } from '@chakra-ui/react';

/**
 * Information of the user.
 * 
 * @param name - Name of the user
 * @param type - 0-guest, 1-home, 2-profile
 */
const ProfileInfo = (props) => {
    return (
        <center>
            <Box w="100%" border = "5px" borderRadius="md" backgroundColor = "#EDFDFD">
                <Image
                    src = {logo} //TODO: Need a method to update the profile pic
                    htmlWidth="200px"
                />
                <Heading fontSize="25px" color="gray.900"> {props.name} </Heading>
                <Box h={3}/>
                <ConnectionButton type = {props.button}/>
                <Box h={3}/>
            </Box>
        </center>

    );
}

/**
 * Add Connection / Remove Connection button display
 * 
 * @param {*} props 
 */
//TODO: Add onClick method
const ConnectionButton = (props) => {
    if (props.type == "1") {
        return (
        <Button colorScheme="blue" variant="solid" >
        Add Connection
         </Button>);
    } else if (props.type == "2") {
        return (
        <Button colorScheme="red" variant="solid">
        Remove Connection
        </Button>);
    } else if (props.type == "0") {
        return (<div></div>)
    } else {
        throw new Error("Invalid type for ConnectionButton");
    }
}

export default ProfileInfo;