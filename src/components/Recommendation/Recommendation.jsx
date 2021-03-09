import { React } from "react"

import {
    Avatar,
    HStack,
    VStack,
    Text,
    StackDivider,
    Button,
    Spacer
} from '@chakra-ui/react';

import { ExternalLinkIcon } from '@chakra-ui/icons';

import { useHistory } from 'react-router-dom';

const Recommendation = ({ author, description, image, user, authUser }) => {
    const history = useHistory();

    const viewProfile = () => {
        if (authUser) {
            if (authUser != user)
                history.push(`/profiles/${author}`, { user });
            else
                history.push('/');
        } else
            history.push(`/profiles/${author}`, { user });
    }

    return (
        <HStack
            gap={4}
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            px={4}
            py={2}
            bg="purple.100"
            boxShadow="lg"
            align="top"
            spacing={3}
            minWidth="350px"
        >
            <Avatar name={author} src={image} borderColor="purple.500"
                showBorder borderWidth={1} />
            <VStack align="left">
                <HStack>
                <Text color="gray.600" fontWeight="bold" align="left">{author}</Text>
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
                <StackDivider borderWidth="1px" borderColor="purple.200" />
                <Text>{description}</Text>
            </VStack>
        </HStack>
    )
}

export default Recommendation;