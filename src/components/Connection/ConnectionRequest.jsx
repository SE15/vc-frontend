import {
    Avatar,
    Box,
    Button,
    Heading,
    HStack,
    Spacer,
    StackDivider,
    VStack,
    ReactRouterLink,
} from "@chakra-ui/react"
import {
    CheckIcon,
    CloseIcon,
} from '@chakra-ui/icons'
import { Link } from 'react-router-dom';

const ConnectionRequest = ({ name, onAccept, onReject }) => {
    return (
            <HStack borderWidth="1px" borderRadius="lg" bg="white" px={4} py={2} bg="purple.100" boxShadow="lg">
                <Avatar name={name} />
                <VStack spacing={1}>
                    <Link as={ReactRouterLink} to='/profile'>
                        <Heading fontSize="16px" color="gray.700"> {name} </Heading>
                    </Link>
                    <StackDivider borderWidth="1px" borderColor="purple.200" />
                    <HStack>
                        <Button
                            leftIcon={<CheckIcon boxSize="12px" pb="2px" />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={onAccept}
                        >
                            Accept
                    </Button>
                        <Spacer />
                        <Button
                            leftIcon={<CloseIcon boxSize="12px" pb={1} />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={onReject}
                        >
                            Reject
                    </Button>
                    </HStack>
                </VStack>
            </HStack>
    );
}

export default ConnectionRequest