import {
    VStack,
    Button,
    Heading,
    Text,
    StackDivider,
    Spacer,
    Alert,
    AlertIcon
} from '@chakra-ui/react';

const DeleteAccount = () => {
    return (
        <VStack py={5} w="100%" h="100%" justify="center">
            <Heading size="md" color="purple.700">
                Delete Your Account
        </Heading>
            <StackDivider borderColor="purple.100" borderWidth={1} />
            <Spacer />
            <VStack spacing={3}>
                <Button colorScheme="red" w="40%">Delete Account</Button>
                <Alert status="error" w="80%">
                    <AlertIcon />
                    Once you delete your account, you cannot restore it.
                </Alert>
            </VStack>
            <Spacer />
        </VStack>
    );
}

export default DeleteAccount;