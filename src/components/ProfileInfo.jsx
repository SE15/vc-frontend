import React from 'react';

import anonymous from '../assets/anonymous.png';
import { Skeleton, SkeletonCircle, Button, Box, Heading, Avatar } from '@chakra-ui/react';
import {
    EmailIcon,
    RepeatClockIcon,
    CloseIcon
} from '@chakra-ui/icons';

/**
 * Information of the user.
 * 
 * @param name - Name of the user
 * @param type - 0-guest/home, 1-add, 2-remove 3-pending
 */
const ProfileInfo = ({ name, button, visit, isLoading }) => {
    return (
        <center>
            <Box w="100%" border="5px" pt={2}>
                {isLoading ? <SkeletonCircle size="120px" /> :
                    <Avatar
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                        size="2xl"
                        borderColor="purple.500"
                        showBorder={true}
                        loading="lazy"
                    />
                }
                <Skeleton isLoaded={!isLoading}>
                    <Heading fontSize="20px" color="purple.700" py={2}> {name} </Heading>
                </Skeleton>
                {!isLoading && <ConnectionButton type={button} visit={visit} />}
            </Box>
        </center>
    );
}

//TODO: Add onClick method
const ConnectionButton = ({ visit, type }) => {
    if (visit) {
        if (type == "1") {
            return (
                <Button leftIcon={<EmailIcon />} colorScheme="green" variant="outline" my={2}>
                    Send Request
                </Button>);
        } else if (type == "2") {
            return (
                <Button leftIcon={<CloseIcon />} colorScheme="red" variant="outline" my={2}>
                    Remove Connection
                </Button>);
        } else if (type == "3") {
            return (
                <Button leftIcon={<RepeatClockIcon />} colorScheme="orange" variant="outline" my={2}>
                    Request Pending
                </Button>)
        } else if (type == "0") {
            return (<div></div>)
        } else {
            throw new Error("Invalid type for ConnectionButton");
        }
    } else {
        return (
            <div>

            </div>
        );
    }


}

export default ProfileInfo;