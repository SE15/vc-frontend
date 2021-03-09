import { React } from "react"
//import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { Text, Avatar, HStack, Button, Spacer } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom';

function Connection({ name, user, image, widthAuto, authUser }) {
    const history = useHistory();

    const viewProfile = () => {
        if (authUser) {
            if (authUser != user)
                history.push(`/profiles/${name}`, { user });
            else
                history.push('/');
        } else
            history.push(`/profiles/${name}`, { user });
    }

    return (
        <HStack
            overflowY="hidden"
            h="70px"
            minH={70}
            borderWidth="1px"
            borderRadius="lg"
            px={4}
            py={2}
            bg="purple.100"
            boxShadow="lg"
            spacing={4}
            width={widthAuto ? "100%" : "350px"}>
            <Avatar name={name} src={image} borderColor="purple.500"
                    showBorder borderWidth={1}/>
            <Text color="gray.700" fontWeight={500} align="center" fontSize={16} overflow="hidden" isTruncated>{name}</Text>
            <Spacer />
            <Button
                leftIcon={<ExternalLinkIcon />}
                variant="link"
                colorScheme="blue"
                pb={1}
                onClick={viewProfile}>
                view
            </Button>
        </HStack>
    )
}

export default Connection;