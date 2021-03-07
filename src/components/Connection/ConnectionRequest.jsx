import {
    Avatar,
    Button,
    HStack,
    Spacer,
    StackDivider,
    VStack,
} from "@chakra-ui/react"
import {
    CheckIcon,
    CloseIcon,
} from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom';

const ConnectionRequest = ({ name, onAccept, onReject, user, loader, loadingId }) => {
    const history = useHistory();

    return (
        <HStack borderWidth="1px" borderRadius="lg" bg="white" px={4} py={2} bg="purple.100" boxShadow="lg">
            <Avatar name={name} />
            <VStack spacing={1}>
                <Button
                    fontSize="16px"
                    color="gray.700"
                    onClick={() => { history.push(`/profiles/${name}`, { user }) }}
                    variant="link"
                >
                    {name}
                </Button>
                <StackDivider borderWidth="1px" borderColor="purple.200" />
                <HStack>
                    <Button
                        leftIcon={<CheckIcon boxSize="12px" pb="2px" />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={onAccept}
                        w="90px"
                        isLoading={loader===1 && loadingId===user}
                        isDisabled={loader===2 && loadingId===user}
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
                        w="90px"
                        isLoading={loader===2 && loadingId===user}
                        isDisabled={loader===1 && loadingId===user}
                    >
                        Reject
                    </Button>
                </HStack>
            </VStack>
        </HStack>
    );
}

export default ConnectionRequest