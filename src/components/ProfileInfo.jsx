import React from 'react';

import anonymous from '../assets/anonymous.png';
import { Image, Button, Box, Heading } from '@chakra-ui/react';
import { kSecondaryBlue} from '../utils/constants';


/**
 * Information of the user.
 * 
 * @param name - Name of the user
 * @param type - 0-guest/home, 1-add, 2-remove 3-pending
 */
const ProfileInfo = (props) => {
    return (
        <center>
            <Box w="100%" border = "5px"  bg = {kSecondaryBlue}>
                <Image
                    src = {anonymous} //TODO: Need a method to update the profile pic
                    htmlWidth="150px"
                />
                <Heading fontSize="25px" color="white"> {props.name} </Heading>
                <Box h={3}/>
                <ConnectionButton type = {props.button} visit={props.visit}/>
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
    if (props.visit) {
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
        } else if (props.type == "3") {
            return (
            <Heading color = "green.100" size = "md">Request Pending</Heading>);  
        } else if (props.type == "0") {
            return (<div></div>)
        } else {
            throw new Error("Invalid type for ConnectionButton");
        }
    } else {
        return(
            <div>
            
            </div>
        );
    }

    
}

export default ProfileInfo;